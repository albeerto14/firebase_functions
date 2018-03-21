//Get data from root: event.data.ref.root

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello ");
});

/*admin.initializeApp({
    credential: admin.credential.refreshToken(refreshToken),
    apiKey: "AIzaSyBuCthX0RXuTeaqw1B39CzV7NCT0dkHZy4",
    authDomain: "practica2firebase.firebaseapp.com",
    databaseURL: "https://practica2firebase.firebaseio.com",
    projectId: "practica2firebase",
    storageBucket: "practica2firebase.appspot.com",
    messagingSenderId: "728334178949"
});*/

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
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
    });