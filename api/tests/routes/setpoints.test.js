
const state = require('../../lib/state')
const app = require('../../lib/app')
const request = require('supertest')(app)

// Fake config for tests
const testConfig = {
  setpoint: 20
  // setpoint: {
  //   manu: 20,
  //   auto: 20,
  //   forced: 20
  // }
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

test('PUT setpoint - Correct value', async () => {
  const res = await request
    .put('/api/setpoint')
    .send({ value: 23.3 })
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: true })
})

test('PUT setpoint - Wrong value', async () => {
  const res = await request
    .put('/api/setpoint')
    .send({ value: 456.54 })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('PUT setpoint - Wrong type', async () => {
  const res = await request
    .put('/api/setpoint')
    .send({ value: '15.3' })
  expect(res.statusCode).toBe(400)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toMatchObject({ result: false })
})

test('GET setpoint', async () => {
  const res = await request
    .get('/api/setpoint')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toMatch(/json/)
  expect(res.body).toEqual({ result: true, value: 23.3 })
})

// test('PUT setpoints auto - Correct value', async () => {
//   const res = await request
//     .put('/api/setpoints/auto')
//     .send({ value: 19.3 })
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: true })
// })

// test('PUT setpoints auto - Wrong value', async () => {
//   const res = await request
//     .put('/api/setpoints/auto')
//     .send({ value: -10.2 })
//   expect(res.statusCode).toBe(400)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: false })
// })

// test('PUT setpoints auto - Wrong type', async () => {
//   const res = await request
//     .put('/api/setpoints/auto')
//     .send({ value: '20.1' })
//   expect(res.statusCode).toBe(400)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: false })
// })

// test('GET setpoints auto', async () => {
//   const res = await request
//     .get('/api/setpoints/auto')
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toEqual({ result: true, value: 19.3 })
// })

// test('PUT setpoints forced - Correct value', async () => {
//   const res = await request
//     .put('/api/setpoints/forced')
//     .send({ value: 18.3 })
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: true })
// })

// test('PUT setpoints forced - Wrong value', async () => {
//   const res = await request
//     .put('/api/setpoints/forced')
//     .send({ value: 2.3 })
//   expect(res.statusCode).toBe(400)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: false })
// })

// test('PUT setpoints forced - Wrong type', async () => {
//   const res = await request
//     .put('/api/setpoints/forced')
//     .send({ value: '17.1' })
//   expect(res.statusCode).toBe(400)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toMatchObject({ result: false })
// })

// test('GET setpoints forced', async () => {
//   const res = await request
//     .get('/api/setpoints/forced')
//   expect(res.statusCode).toBe(200)
//   expect(res.headers['content-type']).toMatch(/json/)
//   expect(res.body).toEqual({ result: true, value: 18.3 })
// })
