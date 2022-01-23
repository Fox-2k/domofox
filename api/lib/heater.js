const assert = require('assert')

module.exports = {
  heating: false,

  switchState: function (value) {
    assert(typeof value === 'boolean', 'state value must be true or false')

    this.heating = value
    this.heating ? console.log('Heater is HEATING') : console.log('Heater is STOPPED')

    // TODO : Control GPIO to control real heater

    return { heating: this.heating }
  },

  toggleState: function () {
    return this.switchState(!this.heating)
  }
}
