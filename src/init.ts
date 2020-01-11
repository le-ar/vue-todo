import firebaseConfig from './firestore.key.secure.json';
import firebase from 'firebase/app';
import { FirestoreDatasourceImpl } from './data/datasources/firestore_datasource';
import FirestoreRepositoryImpl from './data/repositories/firestore_repository_impl';
import GetTodoCountUseCase from './domain/usecases/get_todo_count';
import { TodoVuex } from './presentation/vuex/todo_vuex';
import store from './presentation/vuex';
import GetAllTodosUseCase from './domain/usecases/get_all_todos';
import { LocalDatasourceImpl } from './data/datasources/local_datasource';
import AddTodoUseCase from './domain/usecases/add_todo';


function InitApp() {
    firebase.initializeApp(firebaseConfig);

    //! Datasources
    let firestoreDatasource = new FirestoreDatasourceImpl(firebase.firestore());
    let localDatasource = new LocalDatasourceImpl();

    //! Repositories
    let firestoreRepository = new FirestoreRepositoryImpl(firestoreDatasource, localDatasource);

    //! Usecases
    let getTodoCountUseCase = new GetTodoCountUseCase(firestoreRepository);
    let getAllTodosUseCase = new GetAllTodosUseCase(firestoreRepository);
    let addTodoUseCase = new AddTodoUseCase(firestoreRepository);

    //! Controllers
    let todoVuex = new TodoVuex(store, {
        getTodoCountUseCase: getTodoCountUseCase,
        getAllTodosUseCase: getAllTodosUseCase,
        addTodoUseCase: addTodoUseCase,
    })
    todoVuex.initVuexModuleIfNotYet();
}

export default InitApp;