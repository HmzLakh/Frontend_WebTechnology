import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// Components
import Homepage from '../views/Homepage.vue'
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
      meta: {
        needsLogin: true
      },
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
      component: Loginpage,
      meta: {
        needsLogout: true
      },
    },
    {
      name: 'register',
      path: '/register',
      component: Registerpage,
      meta: {
        needsLogout: true
      },
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
      path: '/profile/:username',
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

// We use this in order to avoid user access pages that he are not supposed to access
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.needsLogin)) {
    if (!store.getters.isUserConnected) {
      next({ name: 'root' });
    } else {
      next();
    }
  } else {
    next();
  }
  if(to.matched.some(record => record.meta.needsLogout)){
    if (store.getters.isUserConnected) {
      next({ name: 'root' });
    } else {
      next();
    }
  } else {
    next()
  }
});

export default router;