import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import common from '../store/modules/common'
import home from '../store/modules/home'
import detail from '../store/modules/detail'
import title from '../store/modules/title'

Vue.use(Vuex)
export default () => {
  const store = new Vuex.Store({
    modules:{
      common,
      home,
      detail,
      title
    },
    state: {
      status: 0, 
      userName: '',
      userEmail: '',
      userImg: '',
    },
    mutations: {
      changeStatus: (state, status) => {
        state.status = status
      },
      login: (state, res) => {
        state.status = 1
        state.userName = res.name
        state.userEmail = res.email
        state.userImg = res.img
        VueCookies.set('email', res.email)
        VueCookies.set('pwd', res.pwd)
      },
      logout: state => {
        state.status = 0
        state.userEmail = ''
        state.userName = ''
      }
    }
  })
  if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store
}
