import {EngineUnavailableError} from './engineUnavailableError.mjs'
import { DISPLAYED_UNITS } from "./experienceConfig.mjs";

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

let getHowLong

const formatDuration = (duration) => {
  const formatted = DISPLAYED_UNITS.map((unit) => {
    const value = duration[unit]
    return `${value} ${value === 1 ? unit.slice(0, -1) : unit}`
  }).join(' ')

  return `I've been building software commercially for ${formatted}.`
}

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
  getHowLong = undefined
  console.error(logMessage, error)
  durationNode.value = FALLBACK_MESSAGE
  showEngineError(error)
}

const updateDuration = () => {
  if (!getHowLong) return

  try {
    durationNode.value = formatDuration(getHowLong())
  } catch (error) {
    handleEngineFailure(`The ${selectedEngine()} engine failed to update`, error)
  }
}

const selectEngine = async (engineName) => {
  getHowLong = undefined
  durationNode.value = 'Calculating experience…'
  hideEngineError()

  try {
    const engineModule = await import(engineModules[engineName])

    if (engineName !== selectedEngine()) return

    getHowLong = engineModule.getHowLong
    durationNode.value = formatDuration(getHowLong())
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
