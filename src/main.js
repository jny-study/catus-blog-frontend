import Vue from 'vue'
import App from './App.vue'
import router from './config/router'
import store from './vuex/store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeading, faBold, faItalic, faListOl, faListUl, faCode, faLink, faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

library.add(faHeading, faBold, faItalic, faListOl, faListUl, faCode, faLink, faImage)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')