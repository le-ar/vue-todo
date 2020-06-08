import * as firebase from "firebase/app";

import "firebase/firestore";
import TodoModel from '../models/todo_model';

interface FirestoreDatasource {
    getTodoCount(): Promise<number>
    getAllTodos(): Promise<TodoModel[]>
    addTodo(todoModel: TodoModel): Promise<any>;
    updateTodoCkeck(todoModel: TodoModel): Promise<void>;
    updateTodoText(todoModel: TodoModel): Promise<void>;
    removeTodo(todoModel: TodoModel): Promise<any>;
}

class FirestoreDatasourceImplLocal implements FirestoreDatasource {
    todoId: number = 0;
    todos: TodoModel[] = [];

    async getTodoCount(): Promise<number> {
        return this.todos.length;
    }

    async getAllTodos(): Promise<TodoModel[]> {
        return this.todos;
    }

    async addTodo(todoModel: TodoModel): Promise<any> {
        todoModel.UID = (this.todoId++).toString();
        todoModel.createdAt = new Date().getTime() / 1000;
        this.todos.push(todoModel);
        return todoModel;
    }

    async updateTodoCkeck(todoModel: TodoModel): Promise<void> {
        let todo = this.todos.find(todo => todo.UID === todoModel.UID);
        if (typeof todo !== 'undefined') {
            todo.isCompleted = todoModel.isCompleted;
        }
    }

    async updateTodoText(todoModel: TodoModel): Promise<void> {
        let todo = this.todos.find(todo => todo.UID === todoModel.UID);
        if (typeof todo !== 'undefined') {
            todo.text = todoModel.text;
        }
    }

    async removeTodo(todoModel: TodoModel): Promise<any> {
        this.todos = this.todos.filter(todo => todo.UID !== todoModel.UID);
    }
}

class FirestoreDatasourceImplLocalStorage implements FirestoreDatasource {
    private get KEY_TODO(): string {
        return 'todo';
    }

    private get KEY_TODO_ID(): string {
        return 'todo_id';
    }

    private get newTodoId(): string {
        let todoId = localStorage.getItem(this.KEY_TODO_ID);
        if (todoId === null) {
            todoId = '0';
        }
        todoId = (parseInt(todoId) + 1).toString();
        localStorage.setItem(this.KEY_TODO_ID, todoId);
        return todoId;
    }

    async getTodoCount(): Promise<number> {
        return (await this.getAllTodos()).length;
    }

    async getAllTodos(): Promise<TodoModel[]> {
        let todos = localStorage.getItem(this.KEY_TODO);
        if (todos === null) {
            todos = '[]';
        }
        return JSON.parse(todos);
    }

    private saveAllTodos(todos: TodoModel[]): void {
        localStorage.setItem(this.KEY_TODO, JSON.stringify(todos));
    }

    private async saveTodo(todoModel: TodoModel): Promise<void> {
        let todos = await this.getAllTodos()
        for (let todo of todos) {
            if (todo.UID === todoModel.UID) {
                todo.UID = todoModel.UID;
                todo.createdAt = todoModel.createdAt;
                todo.isCompleted = todoModel.isCompleted;
                todo.text = todoModel.text;
            }
        }
        this.saveAllTodos(todos);
    }

    async addTodo(todoModel: TodoModel): Promise<any> {
        todoModel.UID = this.newTodoId;
        todoModel.createdAt = new Date().getTime() / 1000;

        let todos = (await this.getAllTodos());
        todos.push(todoModel);
        this.saveAllTodos(todos);

        return todoModel;
    }

    private async getTodoByUID(todoUID: string): Promise<TodoModel | null> {
        let todos = await this.getAllTodos();
        let todo = todos.find(todo => todo.UID === todoUID);
        if (typeof todo === 'undefined') {
            return null;
        }
        return todo;
    }

    async updateTodoCkeck(todoModel: TodoModel): Promise<void> {
        let todo = await this.getTodoByUID(todoModel.UID);
        if (todo !== null) {
            todo.text = todoModel.text;
            todo.isCompleted = todoModel.isCompleted;
            await this.saveTodo(todo);
        }
    }

    async updateTodoText(todoModel: TodoModel): Promise<void> {
        let todo = await this.getTodoByUID(todoModel.UID);
        if (todo !== null) {
            todo.isCompleted = todoModel.isCompleted;
            todo.text = todoModel.text;
            await this.saveTodo(todo);
        }
    }

    async removeTodo(todoModel: TodoModel): Promise<any> {
        let todos = await this.getAllTodos();
        todos = todos.filter(todo => todo.UID !== todoModel.UID);
        this.saveAllTodos(todos);
    }
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

    async updateTodoText(todoModel: TodoModel) {
        this.client.collection('todos').doc(todoModel.UID).update({
            text: todoModel.text,
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

export { FirestoreDatasource, FirestoreDatasourceImpl, FirestoreDatasourceImplLocal, FirestoreDatasourceImplLocalStorage }