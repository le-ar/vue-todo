import GetTodoCountUseCase from "@/domain/usecases/get_todo_count";
import { MutationTree, ActionTree, Store } from 'Vuex';
import GetAllTodosUseCase from '@/domain/usecases/get_all_todos';
import AddTodoUseCase from '@/domain/usecases/add_todo';
import RemoveTodoUseCase from '@/domain/usecases/remove_todo';
import UpdateTodoCheckUseCase from '@/domain/usecases/update_todo_ckeck';
import UpdateTodoTextUseCase from '@/domain/usecases/update_todo_text';

const moduleName = 'todo';

class TodoVuex {
    usecases: {
        getTodoCountUseCase: GetTodoCountUseCase,
        getAllTodosUseCase: GetAllTodosUseCase,
        addTodoUseCase: AddTodoUseCase,
        removeTodoUseCase: RemoveTodoUseCase,
        updateTodoCheckUseCase: UpdateTodoCheckUseCase,
        updateTodoTextUseCase: UpdateTodoTextUseCase,
    };
    vuex: Store<any>;

    constructor(vuex: Store<any>, usecases: {
        getTodoCountUseCase: GetTodoCountUseCase,
        getAllTodosUseCase: GetAllTodosUseCase,
        addTodoUseCase: AddTodoUseCase,
        removeTodoUseCase: RemoveTodoUseCase,
        updateTodoCheckUseCase: UpdateTodoCheckUseCase,
        updateTodoTextUseCase: UpdateTodoTextUseCase,
    }) {
        this.usecases = usecases;
        this.vuex = vuex;
    }

    initVuexModuleIfNotYet() {
        if (typeof this.vuex.state.modules[moduleName] === 'undefined') {
            this.vuex.registerModule(moduleName, {
                namespaced: true,
                state: this.generateState(),
                actions: this.actions,
                mutations: this.mutations,
            });
            this.vuex.commit('REGISTER_MODULE', moduleName);
        }
    }

    generateState() {
        return {
            isTodosCountLoaded: false,
            todosCount: 0,
            currentPage: -1,
            isTodosLoaded: false,
            allTodos: [],
        };
    }

    actions: ActionTree<any, any> = {
        GET_TODOS_COUNT: async ({ commit }) => {
            let todosCount = await this.usecases.getTodoCountUseCase.execute();

            commit('SET_TODOS_COUNT', todosCount);
            commit('SET_TODOS_COUNT_LOADED', true);
        },
        ADD_TODO: async ({ dispatch, commit }, payload) => {
            commit('SET_IS_TODOS_LOADED', false);
            await this.usecases.addTodoUseCase.execute(payload);
            dispatch('GET_TODOS_COUNT');
            dispatch('LOAD_TODOS');
        },
        REMOVE_TODO: async ({ dispatch, commit }, uid) => {
            commit('SET_IS_TODOS_LOADED', false);
            await this.usecases.removeTodoUseCase.execute(uid);
            dispatch('GET_TODOS_COUNT');
            dispatch('LOAD_TODOS');
        },
        LOAD_TODOS: async ({ commit, state }) => {
            commit('SET_IS_TODOS_LOADED', false);
            commit('SET_ALL_TODOS', await this.usecases.getAllTodosUseCase.execute());
            commit('SET_IS_TODOS_LOADED', true);
        },
        TOGGLE_TODO_CHECK: async ({ commit, state }, todo) => {
            this.usecases.updateTodoCheckUseCase.execute(todo);
        },
        UPDATE_TODO_TEXT: async ({ commit, state }, todo) => {
            this.usecases.updateTodoTextUseCase.execute(todo);
        },
    }

    mutations: MutationTree<any> = {
        SET_TODOS_COUNT: (state, payload) => {

            state.todosCount = payload;
        },
        SET_TODOS_COUNT_LOADED: (state, payload) => {
            state.isTodosCountLoaded = payload;
        },
        SET_CURRENT_PAGE: (state, payload) => {
            state.currentPage = payload;
        },
        SET_IS_TODOS_LOADED: (state, payload) => {
            state.isTodosLoaded = payload;
        },
        SET_ALL_TODOS: (state, payload) => {
            state.allTodos = payload;
        },
    }
}

export { moduleName, TodoVuex };