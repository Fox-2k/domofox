const assert = require('assert')
const Gpio = require('onoff').Gpio
const state = require('./state')

let heaterRelay

module.exports = {
  ready: false,
  heating: false,

  init: async function () {
    // FIXME: will call multiple time init()
    if (!state.ready) await state.init()
    const heaterPin = state?.config?.heater?.gpio

    // GPIO controlled heater relay, the real one or the fake one if unaccessible
    heaterRelay = Gpio.accessible && heaterPin
      ? new Gpio(heaterPin, 'out')
      : {
          write: async value => {
            value ? console.log('Heater (virtual) relay switched to ON') : console.log('Heater (virtual) relay switched to OFF')
            this.internal = !!value
          },
          read: async () => !!this.internal
        }
  },

  switchState: async function (value) {
    assert(typeof value === 'boolean', 'state value must be true or false')

    if (await heaterRelay.read() !== value) {
      heaterRelay.write(value ? 1 : 0)
    }

    return { heating: await heaterRelay.read() }
  },

  toggleState: async function () {
    return this.switchState(!(await heaterRelay.read()))
  }
}
