import * as functions from 'firebase-functions';

var admin = require("firebase-admin");

var serviceAccount = require("../keys/key.secure.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://kt-team-e10d4.firebaseio.com"
});

exports.onInstanceCreate = functions.firestore.document('projects/{projectId}/instances/{instanceId}')
    .onCreate((snap, context) =>
        admin.firestore.collection('projects').doc(context.params.projectId).update({
            instanceCount: admin.firestore.FieldValue.increment(1),
        })
    );

exports.onInstanceDelete = functions.firestore.document('projects/{projectId}/instances/{instanceId}')
    .onDelete((snap, context) =>
        admin.firestore.collection('projects').doc(context.params.projectId).update({
            instanceCount: admin.firestore.FieldValue.increment(-1),
        })
    );

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
