// import firebaseConfig from './firestore.key.secure.json';
import firebase from 'firebase/app';
import { FirestoreDatasourceImpl, FirestoreDatasourceImplLocal, FirestoreDatasourceImplLocalStorage } from './data/datasources/firestore_datasource';
import FirestoreRepositoryImpl from './data/repositories/firestore_repository_impl';
import GetTodoCountUseCase from './domain/usecases/get_todo_count';
import { TodoVuex } from './presentation/vuex/todo_vuex';
import store from './presentation/vuex';
import GetAllTodosUseCase from './domain/usecases/get_all_todos';
import { LocalDatasourceImpl } from './data/datasources/local_datasource';
import AddTodoUseCase from './domain/usecases/add_todo';
import RemoveTodoUseCase from './domain/usecases/remove_todo';
import UpdateTodoCheckUseCase from './domain/usecases/update_todo_ckeck';
import UpdateTodoTextUseCase from './domain/usecases/update_todo_text';

let saveToLocalStorage: boolean = false;

function InitApp() {
    // firebase.initializeApp(firebaseConfig);

    //! Datasources
    // let firestoreDatasource = new FirestoreDatasourceImpl(firebase.firestore());
    let firestoreDatasource = saveToLocalStorage ? new FirestoreDatasourceImplLocalStorage() : new FirestoreDatasourceImplLocal();
    let localDatasource = new LocalDatasourceImpl();

    //! Repositories
    let firestoreRepository = new FirestoreRepositoryImpl(firestoreDatasource, localDatasource);

    //! Usecases
    let getTodoCountUseCase = new GetTodoCountUseCase(firestoreRepository);
    let getAllTodosUseCase = new GetAllTodosUseCase(firestoreRepository);
    let addTodoUseCase = new AddTodoUseCase(firestoreRepository);
    let removeTodoUseCase = new RemoveTodoUseCase(firestoreRepository);
    let updateTodoCheckUseCase = new UpdateTodoCheckUseCase(firestoreRepository);
    let updateTodoTextUseCase = new UpdateTodoTextUseCase(firestoreRepository);

    //! Controllers
    let todoVuex = new TodoVuex(store, {
        getTodoCountUseCase: getTodoCountUseCase,
        getAllTodosUseCase: getAllTodosUseCase,
        addTodoUseCase: addTodoUseCase,
        removeTodoUseCase: removeTodoUseCase,
        updateTodoCheckUseCase: updateTodoCheckUseCase,
        updateTodoTextUseCase: updateTodoTextUseCase,
    })
    todoVuex.initVuexModuleIfNotYet();
}

export default InitApp;