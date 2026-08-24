import {STARTED_WORKING_AT, TIME_ZONE,} from './experienceConfig.mjs'
import {EngineUnavailableError} from './engineUnavailableError.mjs'

// instead of window, globalThis works across browsers, workers, and other JavaScript environments
const {Temporal} = globalThis

if (!Temporal) {
  throw new EngineUnavailableError('The Temporal API is not supported by this browser.')
}

const startedWorking = Temporal.PlainDateTime.from(STARTED_WORKING_AT).toZonedDateTime(TIME_ZONE)

export const getHowLongString = () => {
  const now = Temporal.Now.zonedDateTimeISO(TIME_ZONE);

  const diff = startedWorking.until(now, {largestUnit: "years", smallestUnit: "seconds"});

  return `I'm already working with software commercially for ${diff.years} years ${diff.months} months ${diff.days} days ${diff.hours} hours ${diff.minutes} minutes ${diff.seconds} seconds`
}
