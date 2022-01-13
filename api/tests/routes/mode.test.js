
const state = require('../../state')
const app = require('../../app')
const request = require('supertest')(app)

// Fake config for tests
const testConfig = {
  mode: 0
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

test('PUT mode - Correct value', async () => {
  const res = await request
    .put('/api/mode')
    .send({ value: 2 })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: true })
})

test('PUT mode - Wrong value', async () => {
  const res = await request
    .put('/api/mode')
    .send({ value: 12 })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('PUT mode - Wrong type', async () => {
  const res = await request
    .put('/api/mode')
    .send({ value: '12' })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('GET mode', async () => {
  const res = await request
    .get('/api/mode')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toEqual({ result: true, value: 2 })
})
