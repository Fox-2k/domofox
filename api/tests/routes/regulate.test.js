const state = require('../../lib/state')
const app = require('../../lib/app')
const request = require('supertest')(app)

const MODE_OFF = 0
const MODE_MANU = 1
const MODE_AUTO = 2
const MODE_FORCED = 3

// Fake config for tests
const testConfig = {
  heater: {
    gpio: 17
  },
  mode: 0,
  hysteresis: {
    pos: 0.2,
    neg: 0.5
  },
  setpoint: 20,
  sensors: [{
    id: 'dummyId',
    label: 'DriverMock',
    driver: 'mock.js',
    params: {},
    weight: 1,
    calibration: {
      a: 0.1,
      b: 10
    },
    active: true
  }],
  plannings: [{
    id: 'dummySetpointId1',
    label: 'date test 1',
    active: true,
    time: {
      hour: 8,
      min: 1
    },
    days: [true, true, true, true, true, true, true],
    setpoint: 22,
    preset: ''
  },
  {
    id: 'dummySetpointId2',
    label: 'date test 2',
    active: true,
    time: {
      hour: 18,
      min: 1
    },
    days: [true, true, true, true, true, true, false],
    setpoint: 19,
    preset: ''
  },
  {
    id: 'dummySetpointId3',
    label: 'date test 3',
    active: true,
    time: {
      hour: 19,
      min: 32
    },
    days: [true, true, true, true, true, true, true],
    setpoint: 15,
    preset: ''
  }]
}

// Mock load and save functions of state instance not to interfere with real saved config
const spyLoad = jest.spyOn(state, 'load').mockImplementation(async function () { this.config = testConfig })
const spySave = jest.spyOn(state, 'save').mockImplementation(() => Promise.resolve())

beforeAll(async () => {
  // Initialize state instance
  await state.init()
})

afterAll(async () => {
  // Unmock methods not to interfere with other test files
  spyLoad.mockRestore()
  spySave.mockRestore()
})

test('GET regulate - OFF mode - Just reading mock driver', async () => {
  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject({
    mode: MODE_OFF,
    heating: false,
    message: expect.any(String)
  })
  expect(state.config.sensors[0]).toMatchObject({
    raw: 100,
    value: 20,
    last: expect.any(String)
  })
})

test('GET regulate - MANUAL mode - need Heating', async () => {
  state.config.mode = MODE_MANU
  state.config.setpoint = 21 // Mock driver return 20°C
  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject({
    mode: MODE_MANU,
    heating: true,
    message: expect.any(String)
  })
})

test('GET regulate - MANUAL mode - still Heating (negative hysteresis)', async () => {
  state.config.mode = MODE_MANU
  state.config.setpoint = 19.6 // Mock driver return 20°C
  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject({
    mode: MODE_MANU,
    heating: true,
    message: expect.any(String)
  })
})

test('GET regulate - MANUAL mode - stop heating', async () => {
  state.config.mode = MODE_MANU
  state.config.setpoint = 19 // Mock driver return 20°C
  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject({
    mode: MODE_MANU,
    heating: false,
    message: expect.any(String)
  })
})

test('GET regulate - MANUAL mode - still stop heating (positive hysteresis)', async () => {
  state.config.mode = MODE_MANU
  state.config.setpoint = 20.1 // Mock driver return 20°C
  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject({
    mode: MODE_MANU,
    heating: false,
    message: expect.any(String)
  })
})

test('GET regulate - AUTO mode - start heating after auto setpoint changed by planning', async () => {
  state.config.mode = MODE_AUTO
  state.config.setpoint = 19 // Mock driver return 20°C
  // At 08:01 on 02/05/2022, setpoint should change to 22
  jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('05 Feb 2022 08:01:10').valueOf())

  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(state.config.setpoint).toBe(22)
  expect(res.body.value).toMatchObject({
    mode: MODE_AUTO,
    heating: true,
    message: expect.any(String)
  })
})

test('GET regulate - AUTO mode - still heating after auto setpoint NOT changed by planning (not saturday)', async () => {
  state.config.mode = MODE_AUTO
  state.config.setpoint = 22 // Mock driver return 20°C
  // At 18:01 on 02/05/2022, setpoint should not change to 19 because we are on saturday
  jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('05 Feb 2022 18:01:10').valueOf())

  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(state.config.setpoint).toBe(22)
  expect(res.body.value).toMatchObject({
    mode: MODE_AUTO,
    heating: true,
    message: expect.any(String)
  })
})

test('GET regulate - AUTO mode - stop heating after auto setpoint changed by planning', async () => {
  state.config.mode = MODE_AUTO
  state.config.setpoint = 19 // Mock driver return 20°C
  // At 19:32 on 02/05/2022, setpoint should change to 15
  jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('05 Feb 2022 19:32:15').valueOf())

  const res = await request
    .get('/api/regulate/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(state.config.setpoint).toBe(15)
  expect(res.body.value).toMatchObject({
    mode: MODE_AUTO,
    heating: false,
    message: expect.any(String)
  })
})

// test('GET regulate - FORCED mode - start heating', async () => {
//   state.config.mode = MODE_FORCED
//   state.config.setpoint = 23 // Mock driver return 20°C
//   const res = await request
//     .get('/api/regulate/')
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body.value).toMatchObject({
//     mode: MODE_FORCED,
//     heating: true,
//     message: expect.any(String)
//   })
// })

// test('GET regulate - FORCED mode - stop heating and return to AUTO mode after auto setpoint changed by planning', async () => {
//   state.config.mode = MODE_FORCED
//   state.config.setpoint = 23 // Mock driver return 20°C
//   // At 19:32 on 02/05/2022, setpoint should change to 15
//   jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date('05 Feb 2022 19:32:15').valueOf())

//   const res = await request
//     .get('/api/regulate/')
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(state.config.setpoint).toBe(15)
//   expect(res.body.value).toMatchObject({
//     mode: MODE_AUTO,
//     heating: false,
//     message: expect.any(String)
//   })
// })
