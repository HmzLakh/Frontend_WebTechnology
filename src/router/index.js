import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Homepage from '../views/Homepage.vue'
import Testpage from '../views/Testpage.vue'
import Loginpage from '../views/Loginpage.vue'
import Registerpage from '../views/Registerpage.vue'
import Registerpage_owner from '../views/Registerpage_owner.vue'
import Articlepage from '../views/Articlepage.vue'
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
      name: 'register',
      path: '/register',
      component: Registerpage
    },
    {
      name: 'register_owner',
      path: '/register/owner',
      component: Registerpage_owner
    },
    {
      name: 'article',
      path: '/show/:id',
      component: Articlepage,
      props: true
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