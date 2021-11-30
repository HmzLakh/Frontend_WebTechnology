import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Homepage from '../views/Homepage.vue'
import Testpage from '../views/Testpage.vue'
import Dashboardpage from '../views/Dashboardpage.vue'
import Dashboard_EditProfile from '../components/DashComponentEditProfile.vue'
import Dashboard_Home from '../components/DashComponentHome.vue'
import Dashboard_Post from '../components/DashComponentPost.vue'

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
      name: 'home',
      path: '/home',
      component: Dashboardpage,
      children: [
         {
           name: 'home_home',
           path: '',
           component: Dashboard_Home
         },
         {
           name: 'home_edit',
           path: 'edit',
           component: Dashboard_EditProfile
         },
         {
          name: 'home_post',
          path: 'post',
          component: Dashboard_Post
        }
      ]
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