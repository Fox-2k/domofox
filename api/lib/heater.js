const assert = require('assert')
const Gpio = require('onoff').Gpio
const state = require('./state')

class Heater {
  constructor () {
    this.ready = false
    this.heating = false
  }

  async init () {
    if (!state.ready) await state.init()
    const heaterPin = state?.config?.heater?.gpio

    // GPIO controlled heater relay, the real one or the fake one if unaccessible
    this.heaterRelay = Gpio.accessible && heaterPin
      ? new Gpio(heaterPin, 'out')
      : {
          write: async value => {
            value ? console.log('Heater (virtual) relay switched to ON') : console.log('Heater (virtual) relay switched to OFF')
            this.internal = !!value
          },
          read: async () => !!this.internal
        }
  }

  async switchState (value) {
    assert(typeof value === 'boolean', 'state value must be true or false')

    // Init before if not ready
    if (!this.ready) await this.init()

    // Change only if state is different
    if (await this.heaterRelay.read() !== value) {
      this.heaterRelay.write(value ? 1 : 0)
    }

    return { heating: await this.heaterRelay.read() }
  }

  async toggleState () {
    // Init before if not ready
    if (!this.ready) await this.init()
    return this.switchState(!(await this.heaterRelay.read()))
  }
}

module.exports = new Heater()
