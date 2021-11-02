import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import PageA from '../components/PageA.vue'
import Login from '../components/Login.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
      name: 'root',
      path: '/',
      component: PageA
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'notFound',
      path: '*',
      component: NotFound
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  
  export default router;