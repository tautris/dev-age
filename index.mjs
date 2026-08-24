import {EngineUnavailableError} from './engineUnavailableError.mjs'

const FALLBACK_MESSAGE =
  'Commercial software experience since September 3, 2018.'
const UPDATE_INTERVAL_MS = 1000
const engineModules = {
  dayjs: './howLongDayjs.mjs',
  temporal: './howLongTemporal.mjs',
}

const calculatorNode = document.getElementById('calculator')
const durationNode = document.getElementById('duration')
const engineErrorNode = document.getElementById('engine-error')

let getHowLongString

const selectedEngine = () => calculatorNode.elements.engine.value

const hideEngineError = () => {
  engineErrorNode.hidden = true
  engineErrorNode.textContent = ''
}

const showEngineError = (error) => {
  const message =
    error instanceof EngineUnavailableError
      ? error.message
      : 'The selected calculation engine could not be started.'

  engineErrorNode.textContent = `${message} Showing the start date instead.`
  engineErrorNode.hidden = false
}

const handleEngineFailure = (logMessage, error) => {
  getHowLongString = undefined
  console.error(logMessage, error)
  durationNode.value = FALLBACK_MESSAGE
  showEngineError(error)
}

const updateDuration = () => {
  if (!getHowLongString) return

  try {
    durationNode.value = getHowLongString()
  } catch (error) {
    handleEngineFailure(`The ${selectedEngine()} engine failed to update`, error)
  }
}

const selectEngine = async (engineName) => {
  getHowLongString = undefined
  durationNode.value = 'Calculating experience…'
  hideEngineError()

  try {
    const engineModule = await import(engineModules[engineName])

    if (engineName !== selectedEngine()) return

    getHowLongString = engineModule.getHowLongString
    durationNode.value = getHowLongString()
  } catch (error) {
    if (engineName !== selectedEngine()) return

    handleEngineFailure(`Failed to start the ${engineName} engine`, error)
  }
}

calculatorNode.addEventListener('change', () => {
  selectEngine(selectedEngine())
})

selectEngine(selectedEngine())
setInterval(updateDuration, UPDATE_INTERVAL_MS)
