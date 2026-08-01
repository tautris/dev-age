import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/+esm'
import utc from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/utc.js/+esm'
import timezone from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.21/plugin/timezone.js/+esm'

dayjs.extend(utc)
dayjs.extend(timezone)

const durationNode = document.getElementById('duration');

const getHowLongString = () => {
  const now = dayjs()
  const startedWorking = dayjs.tz('2018-09-03 09:00:00', 'Europe/Vilnius')

  const years = now.diff(startedWorking, 'years');
  const afterYears = startedWorking.add(years, 'years')

  const months = now.diff(afterYears, 'months');
  const afterMonths = afterYears.add(months, 'months')

  const days = now.diff(afterMonths, 'days');
  const afterDays = afterMonths.add(days, 'days')

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

