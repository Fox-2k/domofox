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
            this.internal = value ?? Gpio.LOW
          },
          read: async () => this.internal ?? Gpio.LOW
        }
    
    this.ready = true
  }

  async switchState (value) {
    assert(typeof value === 'boolean', 'state value must be true or false')
    value = value ? Gpio.HIGH : Gpio.LOW

    // Init before if not ready
    if (!this.ready) await this.init()

    // Change only if state is different
    if (await this.heaterRelay.read() !== value) {
      this.heaterRelay.write(value ? Gpio.HIGH : Gpio.LOW)
      this.heating = !!value
    }
  }

  async toggleState () {
    // Init before if not ready
    if (!this.ready) await this.init()
    return this.switchState(!(await this.heaterRelay.read()))
  }

  isHeating () {
    return this.heating
  }
}

module.exports = new Heater()
