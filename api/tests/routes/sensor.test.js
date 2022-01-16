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

test('POST sensor - Correct request', async () => {
  const res = await request
    .post('/api/sensor')
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

test('DELETE sensor - Correct request', async () => {
  const sensorToDelete = JSON.parse(JSON.stringify(state.config.sensors[0]))
  const res = await request
    .delete(`/api/sensor/${sensorToDelete.id}`)
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(sensorToDelete)
  expect(state.config.sensors).toHaveLength(0)
})
