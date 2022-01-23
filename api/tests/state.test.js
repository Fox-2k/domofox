const fs = require('fs/promises')
const state = require('../lib/state')

jest.mock('fs/promises')

// Fake config for tests
const testConfig = {
  mode: 0,
  hysteresis: {
    pos: 0.5,
    neg: 0.5
  }
}

test('State load error', async () => {
  // Mock fs readFile & writeFile
  const readFile = fs.readFile.mockRejectedValue('No file')
  const writeFile = fs.writeFile.mockResolvedValue()
  const consoleWarning = jest.spyOn(console, 'warn')
  await state.load()
  expect(readFile).toHaveBeenCalled()
  expect(writeFile).toHaveBeenCalled()
  expect(consoleWarning).toHaveBeenCalled()
})

test('State load again', async () => {
  // Mock fs readFile
  const readFile = fs.readFile.mockResolvedValue(JSON.stringify(testConfig))
  await state.load()
  expect(readFile).toHaveBeenCalled()
  expect(state.config).toEqual(testConfig)
})

test('State save', async () => {
  const writeFile = fs.writeFile.mockResolvedValue()
  await state.save()
  expect(writeFile).toHaveBeenCalled()
  expect(writeFile).toHaveBeenLastCalledWith('state.json', JSON.stringify(testConfig, null, '  '))
})

test('State save error', async () => {
  const writeFile = fs.writeFile.mockRejectedValue('Not allowed')
  const consoleError = jest.spyOn(console, 'error')
  await state.save()
  expect(writeFile).toHaveBeenCalled()
  expect(consoleError).toHaveBeenCalled()
})
