/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'
import assert from 'assert'

import mode from '../api/mode'
import heater from '../api/heater'
import setpoint from '../api/setpoint'
import sensors from '../api/sensors'
import plannings from '../api/plannings'
import hysteresis from '../api/hysteresis'
import traces from '../api/traces'

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
    heating: false,
    setpoint: 0,
    sensors: {
      list: [],
      average: 0
    },
    plannings: [],
    hysteresis: {
      pos: 0.5,
      neg: 0.5
    },
    traces: {
      AVG_TEMP: [],
      SETPOINT: [],
      HEATER: []
    }
  },
  getters: {
    getIsOnline: state => state.isOnline,
    getDate: state => state.date.toLocaleDateString(),
    getTime: state => state.date.toLocaleTimeString(),
    getMode: state => state.mode,
    getHeating: state => state.heating,
    getSetpoint: state => state.setpoint,
    getSensorsAverage: state => state.sensors.average,
    getPlannings: state => state.plannings,
    getSensorsList: state => state.sensors.list
  },
  mutations: {
    setIsOnline: (state, isOnline) => state.isOnline = isOnline,
    setDateTime: state => state.date = new Date(),
    setMode: (state, value) => state.mode = value,
    setHeating: (state, value) => state.heating = value,
    setSetpoint: (state, value) => state.setpoint = value,
    setSensorsList: (state, value) => state.sensors.list = value,
    setSensorsAverage: (state, value) => state.sensors.average = value,
    setSensor: (state, { id, value }) => {
      const idx = state.sensors.list.findIndex(s => s.id === id)
      if (idx > -1) {
        value ? state.sensors.list.splice(idx, 1, value) : state.sensors.list.splice(idx, 1)
      }
    },
    setPlannings: (state, value) => state.plannings = value,
    setPlanning: (state, { id, value }) => {
      const idx = state.plannings.findIndex(p => p.id === id)
      if (idx > -1) {
        value ? state.plannings.splice(idx, 1, value) : state.plannings.splice(idx, 1)
      }
    },
    setHysteresis: (state, { sign, value }) => {
      state.hysteresis[sign] = value
    },
    setTraces: (state, { code, value }) => {
      Vue.set(state.traces, code, [...value] )
      state.traces[code] = value
    },
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
    async getHeating ({ commit }) {
      await handleIfError(commit, async () => {
        const { data } = await heater.getHeating()
        commit('setHeating', data.value)
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
    },
    async getPlannings ({ commit }) {
      await handleIfError(commit, async () => {
        const { data } = await plannings.getPlannings()
        commit('setPlannings', data.value)
      })
    },
    async setPlanning ({ commit }, { id, value }) {
      await handleIfError(async () => {
        const { data } = await plannings.setPlanning(id, value)
        commit('setPlanning', { id, value: data.value })
      })
    },
    async deletePlanning ({ commit }, id) {
      await handleIfError(async () => {
        await plannings.deletePlanning(id)
        commit('setPlanning', { id, value: undefined })
      })
    },
    async createPlanning ({ dispatch }) {
      await handleIfError(async () => {
        await plannings.createPlanning()
        dispatch('getPlannings')
      })
    },
    async setHysteresis ({ commit }, { sign, value }) {
      await handleIfError(async () => {
        const { data } = await hysteresis.setHysteresis(sign, value)
        console.log(data)
        commit('setHysteresis', { sign, value: data.value })
      })
    },
    async createSensor ({ dispatch }) {
      await handleIfError(async () => {
        await sensors.createSensor()
        dispatch('getSensors')
      })
    },
    async setSensor ({ commit }, { id, value }) {
      await handleIfError(async () => {
        const { data } = await sensors.setSensor(id, value)
        commit('setSensor', { id, value: data.value })
      })
    },
    async deleteSensor ({ commit }, id) {
      await handleIfError(async () => {
        await sensors.deleteSensor(id)
        commit('setSensor', { id, value: undefined })
      })
    },
    async getTraces ({ commit }, { code, from, to, table }) {
      await handleIfError(async () => {
        const { data } = await traces.getTraces(code, from, to, table)
        commit('setTraces', { code, value: data.value })
      })
    },
  },
  modules: {
  }
})
