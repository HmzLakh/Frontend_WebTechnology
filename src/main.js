import Vue from 'vue'
import Application from './Application.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStar)
library.add(faEye)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  render: h => h(Application)
})