import * as firebase from "firebase/app";

import "firebase/firestore";
import TodoModel from '../models/todo_model';

interface FirestoreDatasource {
    getTodoCount(): Promise<number>
    getAllTodos(): Promise<TodoModel[]>
    addTodo(todoModel: TodoModel): Promise<any>;
    updateTodoCkeck(todoModel: TodoModel): void;
    removeTodo(todoModel: TodoModel): Promise<any>;
}

class FirestoreDatasourceImpl implements FirestoreDatasource {
    client: firebase.firestore.Firestore

    constructor(client: firebase.firestore.Firestore) {
        this.client = client;
    }

    async removeTodo(todoModel: TodoModel): Promise<any> {
        return await this.client.collection('todos').doc(todoModel.UID).delete();
    }

    async updateTodoCkeck(todoModel: TodoModel) {
        this.client.collection('todos').doc(todoModel.UID).update({
            is_completed: todoModel.isCompleted,
        });
    }

    async addTodo(todoModel: TodoModel): Promise<any> {
        return await this.client.collection('todos').add({
            text: todoModel.text,
            is_completed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    async getAllTodos(): Promise<TodoModel[]> {
        let query = await this.client.collection('todos').orderBy('createdAt', 'desc').get();

        if (query.empty) {
            throw new Error('Empty');
        }

        let result = [];

        for (let doc of query.docs) {
            result.push(new TodoModel(doc.id, doc.data().is_completed, doc.data().text, doc.data().createdAt.seconds));
        }


        return result;
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