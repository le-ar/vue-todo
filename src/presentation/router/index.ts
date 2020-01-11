import Vue from 'vue';
import VueRouter from 'vue-router';
import { Route } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/detailed/:uid',
    name: 'detailed',
    component: () => import(/* webpackChunkName: "detailed" */ '../views/Detailed.vue'),
    beforeEnter: (to: Route, from: Route, next: Function) => {
      if (typeof to.params.uid !== 'string') {
        next('/');
      }

      next();
    },
    props: true,
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: 'page/:id',
        name: 'page',
        component: () => import(/* webpackChunkName: "page" */ '../views/Page.vue'),
        beforeEnter: (to: Route, from: Route, next: Function) => {
          let parsedInt = parseFloat(to.params.id);

          if (isNaN(parsedInt) || !Number.isInteger(parsedInt) || parsedInt < 1) {
            next('/');
          }

          next();
        },
        props: (route: Route) => ({ id: parseInt(route.params.id) - 1 })
      },
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "page" */ '../views/Page.vue'),
        props: (route: Route) => ({ id: 0 })
      }
    ],
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
