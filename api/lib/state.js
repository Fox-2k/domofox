/**
 * State class
 * Manage DomoFox global config state load and save
 */

const fs = require('fs/promises')
const defaultConfig = {
  heater: {
    gpio: 17,
    coolDown: 10000
  },
  mode: 0, // 0: Manu, 1: Auto, 2: Forced
  hysteresis: {
    pos: 0.5,
    neg: 0.5
  },
  setpoint: 20,
  sensors: [],
  plannings: []
}

class State {
  constructor () {
    this.config = {}
    this.fileName = 'state.json'
    this.ready = false
  }

  /**
   * Proceed to the first file load
   */
  async init () {
    await this.load()
    this.ready = true
  }

  /**
   * Load the local config file into 'config' object
   */
  async load () {
    try {
      const data = await fs.readFile(this.fileName)
      this.config = JSON.parse(data)
    } catch (error) {
      console.warn('Error while loading config, creating default config.', error)
      this.config = JSON.parse(JSON.stringify(defaultConfig))
      await this.save()
    }
  }

  /**
   * Save the current config object into the local file
   */
  async save () {
    try {
      await fs.writeFile(this.fileName, JSON.stringify(this.config, null, '  '))
    } catch (error) {
      console.error('Error while saving config!', error)
    }
  }
}

module.exports = new State()
