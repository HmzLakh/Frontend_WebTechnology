import Vue from 'vue';
import VueRouter from 'vue-router';
// Components
import Homepage from '../views/Homepage.vue'
import Testpage from '../views/Testpage.vue'
import Dashboardpage from '../views/Dashboardpage.vue'
import Dashboard_EditProfile from '../components/dashboard_components/DashComponentEditProfile.vue'
import Dashboard_Home from '../components/dashboard_components/DashComponentHome.vue'
import Dashboard_Post from '../components/dashboard_components/DashComponentPost.vue'
import Dashboard_Appointment from '../components/dashboard_components/DashComponentAppointment.vue'

import Loginpage from '../views/Loginpage.vue'
import Registerpage from '../views/Registerpage.vue'
import RegisterChoice from '../components/register_components/RegisterChoice.vue'
import Registerpage_owner from '../components/register_components/Registerpage_owner.vue'
import Registerpage_renter from '../components/register_components/Registerpage_renter.vue'
import Articlepage from '../views/Articlepage.vue'
import NotFound from '../views/NotFound.vue'
import Profilepage from '../views/Profilepage.vue'

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
           path: '/home',
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
        }, {
          name: 'home_appointment',
          path: 'appointment',
          component: Dashboard_Appointment
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
      component: Registerpage,
      children: [
        {
          name: 'register_choice',
          path: '/register',
          component: RegisterChoice
        },
        {
          name: 'register_owner',
          path: 'owner',
          component: Registerpage_owner
        },
        {
          name: 'register_renter',
          path: 'renter',
          component: Registerpage_renter
        }
      ]
    },
    {
      name: 'article',
      path: '/show/:id',
      component: Articlepage,
      props: true
    },
    {
      name: 'profile',
      path: '/profile/:id',
      component: Profilepage,
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