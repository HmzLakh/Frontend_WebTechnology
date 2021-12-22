import Vue from 'vue'
import Application from './Application.vue' // Main application
import store from './store'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faEye,  faArrowAltCircleLeft, faSearch, faChevronLeft, faChevronRight, faThumbsUp, faThumbsDown, faBars, faHome, faSearchLocation, faUserEdit, faBuilding, faPlus, faEdit, faTrash, faCalendarAlt, faTimes, faSpinner, faInfoCircle, faSignInAlt, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar, faEye, faArrowAltCircleLeft, faSearch, faChevronLeft, faChevronRight, faThumbsUp, faThumbsDown, faBars, faHome, faSearchLocation, faUserEdit, faBuilding, faPlus, faEdit, faTrash, faCalendarAlt, faTimes, faSpinner, faInfoCircle, faSignInAlt, faUserPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(Application)
})