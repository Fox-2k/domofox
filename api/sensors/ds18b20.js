const fs = require('fs/promises')
const assert = require('assert')

class ds18b20 {
  constructor (params) {
    this.ready = false
    this.params = params || {}
  }

  async init () {
    await new Promise(resolve => setTimeout(resolve, 200))
    this.ready = true
  }

  async read () {
    assert(this.ready, 'Driver is not ready')

    const sensorRaw = await fs.readFile(`/sys/bus/w1/devices/${this.params.id}/temperature`, 'utf8')
    return parseFloat(sensorRaw) / 1000
  }
}

module.exports = ds18b20
