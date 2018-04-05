//Functions for OT Firebase

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.updateScoreSpectator = functions.database.ref('/Programas/{gala}/PuntuacionesCantantes/{cantante}')
    .onWrite(event => {
        console.log(event.params.cantante);
        admin.database().ref('/Espectadores')
            .orderByChild('cantante1').equalTo(event.params.cantante)
            .on("child_added", snapshot => {
                console.log(snapshot.val().correo);
                return snapshot.ref.update({
                    puntuacion: (snapshot.val().puntuacion + event.data.val())
                });
            });
        return admin.database().ref('/Espectadores')
            .orderByChild('cantante2').equalTo(event.params.cantante)
            .on("child_added", snapshot => {
                console.log(snapshot.val().correo);
                return snapshot.ref.update({
                    puntuacion: (snapshot.val().puntuacion + event.data.val())
                });
            });
    });

exports.updateScoreSinger = functions.database.ref('/Programas/{gala}/PuntuacionesCantantes/{cantante}')
    .onWrite(event => {
        return admin.database().ref('/Cantantes/' + event.params.cantante)
            .on("value", snapshot => {
                return snapshot.ref.update({
                    puntuacionTotal: (snapshot.val().puntuacionTotal + event.data.val())
                });
            });
    });

exports.updateScorePair = functions.database.ref('/Programas/{gala}/PuntuacionesDuetos/{idDueto}/Total')
    .onWrite(event => {
        return admin.database().ref('/Espectadores')
            .orderByChild('dueto').equalTo(event.params.idDueto)
            .on("child_added", snapshot => {
                return snapshot.ref.update({
                    puntuacionDueto: (snapshot.val().puntuacionDueto + event.data.val())
                });
            });
    });


exports.updateRanking = functions.https.onRequest((req, res) => {
    var contador = 0;
    admin.database().ref('/Espectadores').
        on("value", snapshot => {
            contador = (snapshot.numChildren());
        });

    admin.database().ref('/Espectadores').orderByChild('puntuacion').on("child_added", snapshot => {
        var json = {};
        json[contador] = snapshot.val().email;
        contador--;
        return snapshot.ref.parent.parent.child("Ranking").update(json);
    });
});
