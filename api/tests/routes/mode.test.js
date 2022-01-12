
const state = require('../../state')
const app = require('../../app')
const request = require('supertest')(app)

jest.mock('../../state')

const fakeState = {
  config: {
    mode: 1
  }
}

// A vérifier
state.load.mockImplementation(() => Promise.resolve(fakeState))
state.save.mockImplementation(() => Promise.resolve())

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

test('GET mode', async () => {
  const res = await request
    .get('/api/mode')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toEqual({ result: true, value: 2 })
})
