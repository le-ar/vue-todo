import * as functions from 'firebase-functions';

const admin = require("firebase-admin");

const serviceAccount = require("../keys/key.secure.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kt-team-e10d4.firebaseio.com"
});

exports.onInstanceCreate = functions.firestore.document('todos/{todoId}')
    .onCreate((snap, context) => {
        admin.firestore().collection('docs_count').doc('todos').update({
            instanceCount: admin.firestore.FieldValue.increment(1),
        });
        return admin.firestore().collection('todos').doc(context.params.todoId).update({
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        })
    });

exports.onInstanceDelete = functions.firestore.document('todos/{todoId}')
    .onDelete((snap, context) =>
        admin.firestore().collection('docs_count').doc('todos').update({
            instanceCount: admin.firestore.FieldValue.increment(-1),
        })
    );

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
