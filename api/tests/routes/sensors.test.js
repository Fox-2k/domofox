const state = require('../../state')
const app = require('../../app')
const request = require('supertest')(app)

// Fake config for tests
const testConfig = {
  sensors: []
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

test('POST sensors - Correct request', async () => {
  const res = await request
    .post('/api/sensors')
    .send({
      label: 'test sensor'
    })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({
    result: true,
    value: {
      id: expect.any(String),
      label: 'test sensor',
      driver: expect.any(String),
      params: expect.any(Object),
      weight: 1,
      calibration: {
        a: expect.any(Number),
        b: expect.any(Number)
      },
      active: true,
      created: expect.any(String)
    }
  })
  expect(res.body.value).toMatchObject(state.config.sensors[0])
})

test('GET all sensors - Correct request', async () => {
  const res = await request
    .get('/api/sensors/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(state.config.sensors)
})

test('GET sensors - Correct request', async () => {
  const res = await request
    .get(`/api/sensors/${state.config.sensors[0].id}`)
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(state.config.sensors[0])
})

test('PUT sensors - Correct request', async () => {
  const res = await request
    .put(`/api/sensors/${state.config.sensors[0].id}`)
    .send({
      label: 'test sensor - UPDATED',
      driver: 'custom.js',
      weight: 2,
      calibration: {
        a: 1.2,
        b: 3
      }
    })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({
    result: true,
    value: {
      id: state.config.sensors[0].id,
      label: 'test sensor - UPDATED',
      driver: 'custom.js',
      params: expect.any(Object),
      weight: 2,
      calibration: {
        a: 1.2,
        b: 3
      },
      active: true,
      created: expect.any(String),
      updated: expect.any(String)
    }
  })
  expect(res.body.value).toMatchObject(state.config.sensors[0])
})

test('DELETE sensors - Correct request', async () => {
  const sensorToDelete = JSON.parse(JSON.stringify(state.config.sensors[0]))
  const res = await request
    .delete(`/api/sensors/${sensorToDelete.id}`)
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(sensorToDelete)
  expect(state.config.sensors).toHaveLength(0)
})

test('DELETE sensors - unknown sensor', async () => {
  const res = await request
    .delete('/api/sensors/dummy-id')
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false, error: expect.any(String) })
  expect(state.config.sensors).toHaveLength(0)
})
