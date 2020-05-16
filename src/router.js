/* eslint-disable no-unused-vars */
import vue from 'vue';
import VueRouter from 'vue-router';
// import Dashbord from './view/main/Dashbord.vue';
import { BootstrapVue, IconsPlugin, FormRadioPlugin } from 'bootstrap-vue';
import Home from './view/main/Home.vue';
import Login from './view/main/Login.vue';
import Register from './view/main/Register.vue';
import { store } from './store/store';

// Install BootstrapVue
vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
vue.use(IconsPlugin);

vue.use(VueRouter);

const routes = [
  {
    path: '/',
    alias: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresVisitor: true }
  }

];

const router = new VueRouter({
  mode: 'history',
  routes,
  store
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getUser) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.getUser) {
      next({
        path: '/home'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
