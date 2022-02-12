import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: new Date()
  },
  getters: {
    getDate: state => state.date.toLocaleDateString(),
    getTime: state => state.date.toLocaleTimeString(),
  },
  mutations: {
    setDateTime: state => state.date = new Date()
  },
  actions: {
    updateDateTime({ commit, dispatch }) {
      commit('setDateTime');
      setTimeout(() => dispatch('updateDateTime'), 1000)
    }
  },
  modules: {
  }
})
