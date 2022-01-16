
const state = require('../../state')
const app = require('../../app')
const request = require('supertest')(app)

// Fake config for tests
const testConfig = {
  hysteresis: {
    pos: 0,
    neg: 0
  }
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

test('PUT hysteresis pos - Correct value', async () => {
  const res = await request
    .put('/api/hysteresis/pos')
    .send({ value: 0.3 })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: true })
})

test('PUT hysteresis pos - Wrong value', async () => {
  const res = await request
    .put('/api/hysteresis/pos')
    .send({ value: -0.2 })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('PUT hysteresis pos - Wrong type', async () => {
  const res = await request
    .put('/api/hysteresis/pos')
    .send({ value: '0.1' })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('GET hysteresis pos', async () => {
  const res = await request
    .get('/api/hysteresis/pos')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toEqual({ result: true, value: 0.3 })
})

test('PUT hysteresis neg - Correct value', async () => {
  const res = await request
    .put('/api/hysteresis/neg')
    .send({ value: 0.3 })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: true })
})

test('PUT hysteresis neg - Wrong value', async () => {
  const res = await request
    .put('/api/hysteresis/neg')
    .send({ value: -0.2 })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('PUT hysteresis neg - Wrong type', async () => {
  const res = await request
    .put('/api/hysteresis/neg')
    .send({ value: '0.1' })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('GET hysteresis neg', async () => {
  const res = await request
    .get('/api/hysteresis/neg')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toEqual({ result: true, value: 0.3 })
})
