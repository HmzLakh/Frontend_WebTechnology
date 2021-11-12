import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Homepage from '../views/Homepage.vue'
import Loginpage from '../views/Loginpage.vue'
import Registerpage from '../views/Registerpage.vue'
import Articlepage from '../views/Articlepage.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
      name: 'root',
      path: '/',
      component: Articlepage //Homepage
    },
    {
      name: 'login',
      path: '/login',
      component: Loginpage
    },
    {
      name: 'register',
      path: '/register',
      component: Registerpage
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