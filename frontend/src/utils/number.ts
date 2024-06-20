export const roundDecimalNumber = (num: number, digit: number) => {
  return parseFloat(num.toFixed(digit))
}
