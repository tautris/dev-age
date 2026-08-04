import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm'
import utc from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/utc.js/+esm'
import timezone from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/timezone.js/+esm'

dayjs.extend(utc)
dayjs.extend(timezone)

const TIME_ZONE = 'Europe/Vilnius'
const durationNode = document.getElementById('duration');

const getHowLongString = () => {
  const now = dayjs().tz(TIME_ZONE)
  const startedWorking = dayjs.tz('2018-09-03 09:00:00', TIME_ZONE)

  const years = now.diff(startedWorking, 'years');
  const afterYears = startedWorking.add(years, 'years').tz(TIME_ZONE, true)

  const months = now.diff(afterYears, 'months');
  const afterMonths = afterYears.add(months, 'months').tz(TIME_ZONE, true)

  const days = now.diff(afterMonths, 'days');
  const afterDays = afterMonths.add(days, 'days').tz(TIME_ZONE, true)

  const hours = now.diff(afterDays, 'hours');
  const afterHours = afterDays.add(hours, 'hours')

  const minutes = now.diff(afterHours, 'minutes');
  const afterMinutes = afterHours.add(minutes, 'minutes')

  const seconds = now.diff(afterMinutes, 'seconds');

  return `I'm already working with software commercially for ${years} years ${months} months ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
}

durationNode.textContent = getHowLongString()
setInterval(() => {
  durationNode.textContent = getHowLongString()
}, 1000);

