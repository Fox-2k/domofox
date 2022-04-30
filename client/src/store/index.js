/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'
import assert from 'assert'

import mode from '../api/mode'
import setpoint from '../api/setpoint'
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
    mode: 0,
    setpoint: 0,
    sensors: {
      list: [],
      average: 0
    }
  },
  getters: {
    getIsOnline: state => state.isOnline,
    getDate: state => state.date.toLocaleDateString(),
    getTime: state => state.date.toLocaleTimeString(),
    getMode: state => state.mode,
    getSetpoint: state => state.setpoint,
    getSensorsAverage: state => state.sensors.average
  },
  mutations: {
    setIsOnline: (state, isOnline) => state.isOnline = isOnline,
    setDateTime: state => state.date = new Date(),
    setMode: (state, value) => state.mode = value,
    setSetpoint: (state, value) => state.setpoint = value,
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
    async getMode ({ commit }) {
      await handleIfError(commit, async () => {
        const { data } = await mode.getMode()
        commit('setMode', data.value)
      })
    },
    async setMode ({ commit }, value) {
      await handleIfError(async () => {
        await mode.setMode(value)
        commit('setMode', value)
      })
    },
    async getSetpoint ({ commit }) {
      await handleIfError(commit, async () => {
        const { data } = await setpoint.getSetpoint()
        commit('setSetpoint', data.value)
      })
    },
    async setSetpoint ({ commit }, value) {
      await handleIfError(async () => {
        await setpoint.setSetpoint(value)
        commit('setSetpoint', value)
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
