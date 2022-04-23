/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'
import assert from 'assert'

import setpoints from '../api/setpoints'
import sensors from '../api/sensors'

Vue.use(Vuex)

async function handleIfError (commit, actions) {
  try {
    await actions()
    commit('setIsOnline', true)
  } catch (error) {
    if (error instanceof assert.AssertionError) {
      console.error(error.message)
    } else {
      commit('setIsOnline', false)
    }
  }
}

export default new Vuex.Store({
  state: {
    isOnline: false,
    date: new Date(),
    setpoint: {
      manu: 0,
      auto: 0,
      forced: 0
    },
    sensors: {
      list: [],
      average: 0
    }
  },
  getters: {
    getIsOnline: state => state.isOnline,
    getDate: state => state.date.toLocaleDateString(),
    getTime: state => state.date.toLocaleTimeString(),
    getSetpointManu: state => state.setpoint.manu,
    getSetpointAuto: state => state.setpoint.auto,
    getSetpointForced: state => state.setpoint.forced,
    getSensorsAverage: state => state.sensors.average
  },
  mutations: {
    setIsOnline: (state, isOnline) => state.isOnline = isOnline,
    setDateTime: state => state.date = new Date(),
    setSetpoint: (state, payload) => state.setpoint[payload.type] = payload.value,
    setSensorsList: (state, value) => state.sensors.list = value,
    setSensorsAverage: (state, value) => state.sensors.average = value
  },
  actions: {
    async updateDateTime ({ commit, dispatch }) {
      // await handleIfError(commit, () => {
      commit('setDateTime')
      setTimeout(() => dispatch('updateDateTime'), 1000)
      // })
    },
    async getSetpoint ({ commit }, type) {
      await handleIfError(commit, async () => {
        const { data } = await setpoints.getSetpoint(type)
        commit('setSetpoint', { type, value: data.value })
      })
    },
    async setSetpoint ({ commit }, { type, value }) {
      await handleIfError(async () => {
        await setpoints.setSetpoint(type, value)
        commit('setSetpoint', { type, value })
      })
    },
    async getSensors ({ commit }) {
      await handleIfError(commit, async () => {
        let res = await sensors.getAllSensors()
        assert(res.data.result, res.data.error)
        commit('setSensorsList', res.data.value)

        res = await sensors.getSensorsAverage()
        assert(res.data.result, res.data.error)
        commit('setSensorsAverage', res.data.value)
      })
    }
  },
  modules: {
  }
})
