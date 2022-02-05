class SensorDriverMock {
  constructor () {
    this.ready = false
  }

  async init () {
    await new Promise(resolve => setTimeout(resolve, 200))
    this.ready = true
  }

  async read () {
    if (this.ready) {
      return 100
    } else {
      throw (new Error('Driver is not ready'))
    }
  }
}

module.exports = SensorDriverMock
