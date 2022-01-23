const state = require('../../state')
const app = require('../../app')
const request = require('supertest')(app)

// Fake config for tests
const testConfig = {
  plannings: []
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

test('POST plannings - Correct request', async () => {
  const res = await request
    .post('/api/plannings')
    .send({
      label: 'test planning',
      active: true,
      time: {
        hour: 23,
        min: 0
      },
      days: [true, false, true, false, true, false, true],
      setpoint: 22
    })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({
    result: true,
    value: {
      id: expect.any(String),
      label: 'test planning',
      time: {
        hour: 23,
        min: 0
      },
      days: [expect.any(Boolean), expect.any(Boolean), expect.any(Boolean), expect.any(Boolean), expect.any(Boolean), expect.any(Boolean), expect.any(Boolean)],
      active: true,
      preset: expect.any(String),
      created: expect.any(String)
    }
  })
  expect(res.body.value).toMatchObject(state.config.plannings[0])
})

test('GET all plannings - Correct request', async () => {
  const res = await request
    .get('/api/plannings/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(state.config.plannings)
})

test('GET plannings - Correct request', async () => {
  const res = await request
    .get(`/api/plannings/${state.config.plannings[0].id}`)
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(state.config.plannings[0])
})

test('PUT plannings - Correct request', async () => {
  const res = await request
    .put(`/api/plannings/${state.config.plannings[0].id}`)
    .send({
      label: 'test planning - UPDATED',
      time: {
        hour: 18,
        min: 15
      },
      days: [true, true, true, true, true, true, true],
      setpoint: 19
    })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({
    result: true,
    value: {
      id: state.config.plannings[0].id,
      label: 'test planning - UPDATED',
      time: {
        hour: 18,
        min: 15
      },
      days: [true, true, true, true, true, true, true],
      setpoint: 19,
      active: true,
      created: expect.any(String),
      updated: expect.any(String)
    }
  })
  expect(res.body.value).toMatchObject(state.config.plannings[0])
})

test('DELETE plannings - Correct request', async () => {
  const planningToDelete = JSON.parse(JSON.stringify(state.config.plannings[0]))
  const res = await request
    .delete(`/api/plannings/${planningToDelete.id}`)
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body.value).toMatchObject(planningToDelete)
  expect(state.config.plannings).toHaveLength(0)
})

test('DELETE plannings - unknown planning', async () => {
  const res = await request
    .delete('/api/plannings/dummy-id')
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false, error: expect.any(String) })
  expect(state.config.plannings).toHaveLength(0)
})
