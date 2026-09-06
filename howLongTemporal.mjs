import {STARTED_WORKING_AT, TIME_ZONE,} from './experienceConfig.mjs'
import {EngineUnavailableError} from './engineUnavailableError.mjs'

// instead of window, globalThis works across browsers, workers, and other JavaScript environments
const {Temporal} = globalThis

if (!Temporal) {
  throw new EngineUnavailableError('The Temporal API is not supported by this browser.')
}

const startedWorking = Temporal.PlainDateTime.from(STARTED_WORKING_AT).toZonedDateTime(TIME_ZONE)

export const getHowLong = () => {
  const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);

  const {years, months, days, hours, minutes, seconds } = startedWorking.until(now, {largestUnit: "years", smallestUnit: "seconds"});

  return {years, months, days, hours, minutes, seconds}
}
