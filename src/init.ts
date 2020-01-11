import firebaseConfig from './firestore.key.secure.json';
import firebase from 'firebase/app';
import { FirestoreDatasourceImpl } from './data/datasources/firestore_datasource';
import FirestoreRepositoryImpl from './data/repositories/firestore_repository_impl';
import GetTodoCountUseCase from './domain/usecases/get_todo_count';
import TodoVuex from './presentation/vuex/todo_vuex';
import store from './presentation/vuex';


function InitApp() {
    firebase.initializeApp(firebaseConfig);
    console.log(firebase);
    

    //! Datasources
    let firestoreDatasource = new FirestoreDatasourceImpl(firebase.firestore());

    //! Repositories
    let firestoreRepository = new FirestoreRepositoryImpl(firestoreDatasource);

    //! Usecases
    let getTodoCountUseCase = new GetTodoCountUseCase(firestoreRepository);

    getTodoCountUseCase.execute().then(es => console.log(es));

    //! Controllers
    let todoVuex = new TodoVuex(store, { getTodoCountUseCase: getTodoCountUseCase })
    todoVuex.initVuexModuleIfNotYet();
}

export default InitApp;