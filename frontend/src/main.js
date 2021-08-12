import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCryptojs from 'vue-cryptojs'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false

Vue.use(VueMoment, { moment, })

Vue.use(VueCryptojs)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('moment', function (value, format) {
  if (value === null || value === undefined || value == '' || format === undefined) {
    return ''
  }
  if (format === 'from') {
    return moment(value).fromNow()
  }
  return moment(value).format(format)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
