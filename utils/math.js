function formatPercent(number) {
  return Number((number * 100).toFixed(1)) + '%'
}

function percentChange(num1, num2) {
  if (num1 === 0 || num2 === 0) return 0
  return (num1 - num2) / num1
}

function roundToDecimal(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

function isEven(n) {
  return n % 2 == 0
}

function isOdd(n) {
  return Math.abs(n % 2) == 1
}

export { formatPercent, percentChange, roundToDecimal, isEven, isOdd }
