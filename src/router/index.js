import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Homepage from '../views/Homepage.vue'
import Loginpage from '../views/Loginpage.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
      name: 'root',
      path: '/',
      component: Homepage
    },
    {
      name: 'login',
      path: '/login',
      component: Loginpage
    },
    {
      name: 'notFound',
      path: '*',
      component: NotFound
    }
]

const router = new VueRouter({
    //mode: "history",
    base: process.env.BASE_URL,
    routes
  });
  
  export default router;