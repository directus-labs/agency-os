function stripHTML(original) {
  if (!original) return
  else return original.replace(/(<([^>]+)>)/gi, '')
}

function truncateString(str, num) {
  if (!str) return
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

function truncateHTML(html, num) {
  if (!html) return
  return truncateString(stripHTML(html), num)
}

// Slugify a string for hyphens and underscores
function slugify(str) {
  if (!str) return
  return str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Deslugify a string for hyphens and underscores and capitalize each word
function deslugify(str) {
  if (!str) return
  return str
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/ +/g, ' ')
    .replace(/(^| )(\w)/g, (s) => s.toUpperCase())
}

function getDomainNameFromEmail(email) {
  const temp = email.replace(/.*@/, '').split('.')
  return temp[temp.length - 2]
}

function toTitleCase(str) {
  if (!str) return
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

function maybePluralize(count, noun, suffix = 's') {
  return `${noun}${count !== 1 ? suffix : ''}`
}

// Calculate read time for a string
function calculateReadTime(str, wordsPerMinute = 200) {
  if (!str) return
  // Strip HTML tags
  str = str.replace(/(<([^>]+)>)/gi, '')

  const noOfWords = str.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return readTime + ' min read'
}

export {
  stripHTML,
  truncateHTML,
  truncateString,
  maybePluralize,
  toTitleCase,
  slugify,
  deslugify,
  getDomainNameFromEmail,
  calculateReadTime,
}
