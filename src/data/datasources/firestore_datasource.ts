import * as firebase from "firebase/app";

import "firebase/firestore";

interface FirestoreDatasource {
    getTodoCount(): Promise<number>
}

class FirestoreDatasourceImpl implements FirestoreDatasource {
    client: firebase.firestore.Firestore

    constructor(client: firebase.firestore.Firestore) {
        this.client = client;
    }

    async getTodoCount(): Promise<number> {
        let documentSnapshot = await this.client.collection('docs_count').doc('todos').get();
        if (typeof documentSnapshot !== 'undefined' && documentSnapshot.exists) {
            let documentData = documentSnapshot.data();
            if (typeof documentData !== 'undefined') {
                return documentData.instanceCount;
            }
        }
        return 0;
    }
}

export { FirestoreDatasource, FirestoreDatasourceImpl }