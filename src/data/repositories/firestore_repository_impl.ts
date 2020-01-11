import { FirestoreDatasource } from "../datasources/firestore_datasource";

class FirestoreRepositoryImpl implements FirestoreDatasource {
    firestoreDatasource: FirestoreDatasource;

    constructor(firestoreDatasource: FirestoreDatasource) {
        this.firestoreDatasource = firestoreDatasource;
    }

    async getTodoCount(): Promise<number> {
        return await this.firestoreDatasource.getTodoCount();
    }
}

export default FirestoreRepositoryImpl;