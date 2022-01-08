const fs = require('fs/promises')
const defaultConfig = {
  mode: 0
}

class State {
  constructor () {
    this.config = {}
    this.fileName = 'state.json'
    this.ready = false
  }

  async init () {
    await this.load()
    this.ready = true
  }

  async load () {
    try {
      const data = await fs.readFile(this.fileName)
      this.config = JSON.parse(data)
    } catch (error) {
      console.warn('Error while loading config, creating default config', error)
      this.config = JSON.parse(JSON.stringify(defaultConfig))
      await this.save()
    }
  }

  async save () {
    try {
      await fs.writeFile(this.fileName, JSON.stringify(this.config, null, '  '))
    } catch (error) {
      console.error('Error while saving config !', error)
    }
  }
}

module.exports = new State()
