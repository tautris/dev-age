import {STARTED_WORKING_AT, TIME_ZONE,} from './experienceConfig.mjs'

const [
  {default: dayjs},
  {default: utc},
  {default: timezone},
] = await Promise.all([
  import('https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm'),
  import('https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/utc.js/+esm'),
  import('https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/timezone.js/+esm'),
]).catch((error) => {
  throw new Error(`Failed to load Day.js from the CDN: ${error}`)
})

dayjs.extend(utc)
dayjs.extend(timezone)

const startedWorking = dayjs.tz(STARTED_WORKING_AT, TIME_ZONE)

export const getHowLongString = () => {
  const now = dayjs().tz(TIME_ZONE)

  const years = now.diff(startedWorking, 'years')
  const afterYears = startedWorking.add(years, 'years').tz(TIME_ZONE, true)

  const months = now.diff(afterYears, 'months')
  const afterMonths = afterYears.add(months, 'months').tz(TIME_ZONE, true)

  const days = now.diff(afterMonths, 'days')
  const afterDays = afterMonths.add(days, 'days').tz(TIME_ZONE, true)

  // Years, months, and days are calendar units, so they preserve the local clock time.
  // Smaller units use elapsed time because Day.js can retain the old UTC offset in edge cases when
  // adding across a DST boundary, producing potentially wrong minute and second remainders.
  const remainingSeconds = Math.trunc((now.valueOf() - afterDays.valueOf()) / 1000)
  const hours = Math.trunc(remainingSeconds / 3600)
  const minutes = Math.trunc((remainingSeconds % 3600) / 60)
  const seconds = remainingSeconds % 60

  return `I'm already working with software commercially for ${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
}
