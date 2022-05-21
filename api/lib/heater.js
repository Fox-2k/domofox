const assert = require('assert')
const Gpio = require('onoff').Gpio
const state = require('./state')

class Heater {
  constructor () {
    this.ready = false
    this.heating = false
    this.coolDown = Promise.resolve()
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
      this.heating = value
    }
    // FIXME:
    // // Change only if state is different
    // if (await this.heaterRelay.read() !== value) {
    //   this.heating = value
    //   this.coolDown.then(() => {
    //     this.heaterRelay.write(this.heating ? 1 : 0)
    //     this.coolDown = new Promise(resolve => setTimeout(resolve, state?.config?.heater?.coolDown || 1000))
    //   })
    // }
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
