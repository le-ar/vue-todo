import GetTodoCountUseCase from "@/domain/usecases/get_todo_count";
import { MutationTree, ActionTree, Store } from 'Vuex';

const moduleName = 'todo';

class TodoVuex {
    usecases: { getTodoCountUseCase: GetTodoCountUseCase };
    vuex: Store<any>;

    constructor(vuex: Store<any>, usecases: { getTodoCountUseCase: GetTodoCountUseCase }) {
        this.usecases = usecases;
        this.vuex = vuex;
    }

    initVuexModuleIfNotYet() {
        if (typeof this.vuex.state.modules[moduleName] === 'undefined') {
            this.vuex.registerModule(moduleName, {
                state: this.generateState(),
                actions: this.actions,
                mutations: this.mutations,
            });
        }
    }

    generateState() {
        return {
            isTodosLoaded: false,
            todosCount: 0,
        };
    }

    actions: ActionTree<any, any> = {
        GET_TODOS_COUNT: async ({ commit }) => {
            let todosCount = await this.usecases.getTodoCountUseCase.execute();

            commit('SET_TODOS_COUNT', todosCount);
        }
    }

    mutations: MutationTree<any> = {
        SET_TODOS_COUNT: ({ state }, payload) => {
            state.todosCount = payload;
        }
    }
}

export default TodoVuex;