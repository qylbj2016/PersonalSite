import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from '../store'
import api from '../src/util/api'
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.prototype.api = api
Vue.prototype.axios = axios

Vue.use(VueLazyload)

Vue.use(VueCookies)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
})

export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>'
    render: h => h(App)
  })
  return { app, router, store }
}
