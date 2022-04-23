/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'

import setpoints from '../api/setpoints'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    date: new Date(),
    setpoint: {
      manu: 0,
      auto: 0,
      forced: 0
    }
  },
  getters: {
    getDate: state => state.date.toLocaleDateString(),
    getTime: state => state.date.toLocaleTimeString(),
    getSetpointManu: state => state.setpoint.manu,
    getSetpointAuto: state => state.setpoint.auto,
    getSetpointForced: state => state.setpoint.Forced
  },
  mutations: {
    setDateTime: state => state.date = new Date(),
    setSetpoint: (state, payload) => state.setpoint[payload.type] = payload.value
  },
  actions: {
    updateDateTime ({ commit, dispatch }) {
      commit('setDateTime')
      setTimeout(() => dispatch('updateDateTime'), 1000)
    },
    async getSetpoint ({ commit }, type) {
      const { data } = await setpoints.getSetpoint(type)
      commit('setSetpoint', { type, value: data.value })
    },
    async setSetpoint ({ commit }, { type, value }) {
      await setpoints.setSetpoint(type, value)
      commit('setSetpoint', { type, value })
    }
  },
  modules: {
  }
})
