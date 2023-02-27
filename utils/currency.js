const formatCurrency = (number, options) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // These options are needed to round to whole numbers if that's what you want.
    ...(options &&
      options.hideZeros && {
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501))
      }),
  })
  return formatter.format(number)
}

function centsToDollars(cents) {
  return Number((cents / 100).toFixed(2))
}

function dollarsToCents(dollars) {
  return Math.round(dollars * 100)
}

export { formatCurrency, centsToDollars, dollarsToCents }
