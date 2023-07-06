function formatPercent(number: number) {
  return Number((number * 100).toFixed(1)) + '%'
}

function percentChange(num1: number, num2: number) {
  if (num1 === 0 || num2 === 0) return 0
  return (num1 - num2) / num1
}

function roundToDecimal(value: number | string, decimals: number) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

function isEven(n: number) {
  return n % 2 === 0
}

function isOdd(n: number) {
  return Math.abs(n % 2) === 1
}

export { formatPercent, percentChange, roundToDecimal, isEven, isOdd }
