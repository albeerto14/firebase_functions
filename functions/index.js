//Get data from root: event.data.ref.root

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
        //var rootRef = admin.database.ref('espectadores');
        //console.log(rootRef);
        const original = event.data.val();
        console.log('Uppercasing', event.params.pushId, original);
        const uppercase = original.toUpperCase();
        // You must return a Promise when performing asynchronous tasks inside a Functions such as
        // writing to the Firebase Realtime Database.
        // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
        //var ref = event.
        return event.data.ref.parent.child('uppercase').set(uppercase);
    });

exports.makeUppercase2 = functions.database
    .ref('/messages/{pushId}/original2')
    .onWrite(event => {
        return admin.database().ref('/other')
            .orderByChild('id').equalTo(event.params.pushId)
            .on("child_added", snapshot => {
                return snapshot.ref.update({
                    dinero: (snapshot.val().dinero + event.data.val()),
                    comida: "manzana"
                });

            });
    });*/


exports.updateScoreSpectator = functions.database.ref('/Programas/{gala}/PuntuacionesCantantes/{cantante}')
    .onWrite(event => {
        console.log(event.params.cantante);
        return admin.database().ref('/Espectadores')
            .orderByChild('cantante1').equalTo(event.params.cantante)
            .on("child_added", snapshot => {
                console.log(snapshot.val().correo);
                return snapshot.ref.update({
                    puntuacion: (snapshot.val().puntuacion + event.data.val())
                });
            });
    });

exports.updateScoreSinger = functions.database.ref('/Programas/{gala}/PuntuacionesCantantes/{cantante}')
    .onWrite(event => {
        console.log(event.params.cantante);
        return admin.database().ref('/Cantantes/' + event.params.cantante)
            .on("value", snapshot => {
                console.log("1");
                return snapshot.ref.update({
                    puntuacionTotal: (snapshot.val().puntuacionTotal + event.data.val())
                });
            });
    });

exports.updateScorePair = functions.database.ref('/Programas/{gala}/PuntuacionDueto/{cantante}')
    .onWrite(event => {
        console.log(event.params.cantante);
        return admin.database().ref('/Cantantes/' + event.params.cantante)
            .on("value", snapshot => {
                console.log("2");
                return snapshot.ref.update({
                    puntuacionTotal: (snapshot.val().puntuacionTotal + event.data.val())
                });
            });
    });
