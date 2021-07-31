import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  debug: true,
  state: {
    user: ''
  },
  mutations: {
    GET_USER(state, payload){
      state.user = payload
    }
  },
  actions: {
    
  },
  modules: {
  }
})
