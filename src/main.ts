import Vue from 'vue'
import App from './App.vue'
import store from './presentation/vuex'
import router from './presentation/router'
import InitApp from './init';

Vue.config.productionTip = false

InitApp();

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
