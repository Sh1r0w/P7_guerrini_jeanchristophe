import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  debug: true,
  state: {
    user: '',
    msgId: ''
  },
  mutations: {
    GET_USER(state, payload){
      state.user = payload
    },
    GET_MSGID(state, payload){
      state.msgId = payload
    },
    GET_ALLUSER(state, payload){
      state.allUser = payload
    },
    GET_LIKE(state, payload){
      state.like = payload
    }
  },

  actions: {
    
  },
  modules: {
  }
})
