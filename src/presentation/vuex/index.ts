import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    modules: {}
  },
  mutations: {
    REGISTER_MODULE: (state, payload: string) => {
      let modules: {
        [key: string]: any,
      } = state.modules;
      modules[payload] = true;
      state.modules = modules;
    }
  },
  actions: {
  },
  modules: {
  }
})
