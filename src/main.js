import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import App from './App.vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// router setup
import routes from './routes/routes'

import './registerServiceWorker'
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)

import Vuetify from 'vuetify'

Vue.prototype.$rootPath = 'http://localhost:5000'
//Vue.prototype.$rootPath = ''

Vue.prototype.$http = axios


import VueSocketIO from 'vue-socket.io'
const store = new Vuex.Store({
  state: {
    count: 0,
    index_id:'',
    treeItems:''
  },
  actions: {
    "SOCKET_response1"(message) {
      console.log(message)
    }
  }
})
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:5000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
   // options: { path: "/" } //Optional options

 }))

// import DataTables and DataTablesServer together

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router,
  vuetify: new Vuetify(),
  components: { App },
  template: '<App/>'
})
