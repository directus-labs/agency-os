// Define the time units
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const monthsAbbr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const daysAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  week: 24 * 60 * 60 * 1000 * 7,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
}

// You probably want to change this to your own locale
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

// Get relative time without libraries like moment.js or dayjs (ie '2 days ago')
function getRelativeTime(d1, d2 = new Date()) {
  // Check if d1 is a date object
  if (!(d1 instanceof Date)) d1 = new Date(d1)

  const elapsed = d1 - d2
  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const u in units)
    if (Math.abs(elapsed) > units[u] || u === 'second')
      return rtf.format(Math.round(elapsed / units[u]), u)
}

// Format date to be more readable
function getFriendlyDate(dateString) {
  const d = new Date(dateString)
  const year = d.getFullYear()
  const date = d.getDate()
  const dateSuffix = (date) => {
    if (date > 3 && d < 21) return 'th'
    switch (date % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }
  const monthIndex = d.getMonth()
  const monthName = months[monthIndex]
  const dayName = daysAbbr[d.getDay()]
  const formatted = `${dayName}, ${monthName} ${date}${dateSuffix()}, ${year}`
  return formatted
}

// Break down a date into its specific parts
function destructureDate(date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth()
  const day = d.getDate()
  const dayName = days[d.getDay()]
  const monthName = monthsAbbr[month]
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()
  return { year, month, day, hour, minute, second, dayName, monthName }
}

// Greeting for user based on time of day
function greetUser() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

// Subtract two dates and return the duration. Add an optional unit to return a specific unit.
function subtractDates(date1, date2, unit) {
  // Check if the dates are valid and if not, try to convert them to dates
  if (isNaN(date1) || isNaN(date2)) {
    date1 = new Date(date1)
    date2 = new Date(date2)
  }

  const diff = date1 - date2
  if (unit === 'years') return diff / units.year
  if (unit === 'months') return diff / units.month
  if (unit === 'weeks') return diff / units.week
  if (unit === 'days') return diff / units.day
  if (unit === 'hours') return diff / units.hour
  if (unit === 'minutes') return diff / units.minute
  if (unit === 'seconds') return diff / units.second
  return diff
}

// Convert a Stripe date to a DateTime object
function toDateTime(secs) {
  var t = new Date('1970-01-01T00:30:00Z') // Unix epoch start.
  t.setSeconds(secs)
  return t
}

function getMonth(dateString) {
  const d = new Date(dateString)
  const monthIndex = d.getMonth()
  return monthsAbbr[monthIndex]
}

function getDate(dateString) {
  const d = new Date(dateString)
  return d.getDate()
}

function getDay(dateString) {
  const d = new Date(dateString)
  const dayIndex = d.getDay()
  return days[dayIndex]
}

export {
  getRelativeTime,
  getFriendlyDate,
  greetUser,
  toDateTime,
  subtractDates,
  monthsAbbr,
  destructureDate,
  getMonth,
  getDate,
  getDay,
}
