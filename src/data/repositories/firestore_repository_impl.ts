import { FirestoreDatasource } from "../datasources/firestore_datasource";
import FirestoreRepository from '@/domain/repositories/firestore_repository';
import TodoEntity from '@/domain/entities/todo_entity';
import { LocalDatasource } from '../datasources/local_datasource';

class FirestoreRepositoryImpl implements FirestoreRepository {
    firestoreDatasource: FirestoreDatasource;
    localDatasource: LocalDatasource;

    constructor(firestoreDatasource: FirestoreDatasource, localDatasource: LocalDatasource) {
        this.firestoreDatasource = firestoreDatasource;
        this.localDatasource = localDatasource;
    }
    async addTodo(todoModel: TodoEntity): Promise<any> {
        console.log(todoModel);
        
        return await this.firestoreDatasource.addTodo(todoModel);
    }

    async getAllTodos(): Promise<TodoEntity[]> {
        try {
            let allTodos = await this.firestoreDatasource.getAllTodos();

            this.localDatasource.cacheTodos(allTodos);

            return allTodos;
        } catch (e) {
            return this.localDatasource.getAllTodos();
        }
    }

    async getTodoCount(): Promise<number> {
        return await this.firestoreDatasource.getTodoCount();
    }
}

export default FirestoreRepositoryImpl;