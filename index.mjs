const FALLBACK_MESSAGE =
  'Commercial software experience since September 3, 2018.'
const UPDATE_INTERVAL_MS = 1000
const engineModules = {
  dayjs: './howLongDayjs.mjs',
  temporal: './howLongTemporal.mjs',
}

const calculatorNode = document.getElementById('calculator')
const durationNode = document.getElementById('duration')

let getHowLongString

const selectedEngine = () => calculatorNode.elements.engine.value

const updateDuration = () => {
  if (getHowLongString) {
    durationNode.value = getHowLongString()
  }
}

const selectEngine = async (engineName) => {
  getHowLongString = undefined
  durationNode.value = 'Calculating experience…'

  try {
    const engineModule = await import(engineModules[engineName])

    if (engineName !== selectedEngine()) return

    getHowLongString = engineModule.getHowLongString
    durationNode.value = getHowLongString()
  } catch (error) {
    if (engineName !== selectedEngine()) return
    // TODO: consider to surface the error in UI.
    //  Especially interested to display Temporal API support not available case to the user. Also dayjs CDN not available is interesting to surface
    console.error(`Failed to start the ${engineName} engine`, error)
    durationNode.value = FALLBACK_MESSAGE
  }
}

calculatorNode.addEventListener('change', () => {
  selectEngine(selectedEngine())
})

selectEngine(selectedEngine())
setInterval(updateDuration, UPDATE_INTERVAL_MS)
