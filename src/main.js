import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import NavBar from './NavBar.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.component('my-navbar', NavBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
