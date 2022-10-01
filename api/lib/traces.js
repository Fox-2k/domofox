const path = require('path')
const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const assert = require('assert')

class Traces {
  constructor () {
    this.ready = false
    this.codes = {
      SP: 'SETPOINT',
      AVG: 'AVG_TEMP',
      HEAT: 'HEATER',
      DETAIL: 'HISTDETAIL',
      DAY: 'HISTDAY',
      MONTH: 'HISTMONTH'
    }
  }

  /**
     * Open, initialize and/or update sqlite database if needed
     */
  async init () {
    try {
      this.db = await sqlite.open({
        filename: path.join(__dirname, '../traces.db'),
        driver: sqlite3.Database
      })

      await this.db.migrate({ migrationsPath: path.join(__dirname, '/traces/migrations') })

      const { STRVAL: version } = await this.db.get("SELECT STRVAL FROM CONFIG where STRKEY='version'") || {}
      console.log('traces db version', version)

      this.ready = true
    } catch (error) {
      console.log('init', error)
    }
  }

  /**
     * Save a trace value in historic table
     * @param {String} code Trace code to save value on
     * @param {Number} value The value to save
     * @param {String?} table In which historic table to save ? default to HISTDETAIL
     */
  async saveTrace (code, value, table = this.codes.DETAIL) {
    try {
      if (value === undefined || value == null) value = -1
      if (typeof value === 'boolean') value = value ? 1 : 0
      assert(typeof value === 'number', 'value must be type of number')

      //   const trace = await this.db.get('SELECT * FROM TRACES where CODTRACE=?', [code])

      //   // If current trace is considered constant between 2 values
      //   if (trace.CONSTANT) {
      //     // Get last stored value during last hour
      //     const last = await this.db.get(`SELECT * FROM ${table} WHERE CODTRACE=? AND DATHIST > date(CURRENT_TIMESTAMP, '-1 hour') order by DATHIST desc LIMIT 1`, [code])

      //     // Skip save if value didn't changed
      //     if (last && last.NUMVALUE === value) return
      //   }

      // Save value
      await this.db.run(`INSERT INTO ${table} (CODTRACE, NUMVALUE) VALUES ( ?, ?)`, [code, value])

      // Purge old values
      await this.purgeTraces(code)
    } catch (error) {
      console.error('saveTrace', error)
    }
  }

  // TODO
  // async aggregateTrace(code) {

  // }

  async purgeTraces (code) {
    try {
      await this.db.run(`DELETE FROM HISTDETAIL WHERE CODTRACE='${code}' AND DATHIST < datetime(CURRENT_TIMESTAMP, '-1 days')`)
      await this.db.run(`DELETE FROM HISTDAY WHERE CODTRACE like '${code}%' AND DATHIST < datetime(CURRENT_TIMESTAMP, '-1 months')`)
      await this.db.run(`DELETE FROM HISTMONTH WHERE CODTRACE like '${code}%' DATHIST < datetime(CURRENT_TIMESTAMP, '-1 years')`)
    } catch (error) {
      console.error('purgeTrace', error)
    }
  }

  /**
     *
     * @param {String} code
     * @param {Date} from
     * @param {Date} to
     * @param {String?} table
     */
  async getTrace (code, from, to, table = this.codes.DETAIL) {
    try {
      assert(code, 'trace code is required')
      assert(from, 'from date is required')
      assert(to, 'to date is required')

      const rawData = await this.db.all(`SELECT datetime(DATHIST, 'localtime') as DATHIST, NUMVALUE FROM ${table} where CODTRACE=? and DATHIST between datetime(?) and datetime(?)`, [code, from, to])

      return rawData.map(d => ({
        x: d.DATHIST,
        y: d.NUMVALUE
      }))
    } catch (error) {
      console.error('getTrace', error)
    }
  }
}

module.exports = new Traces()
