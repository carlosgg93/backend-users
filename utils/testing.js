const palindrome = (str) => {
  if (str === undefined) {
    return undefined
  }
  return str.split('').reverse().join('')
}

const average = (array) => {
  if (array === undefined) {
    return 0
  }

  if (array.length === 0) {
    return 0
  }
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}

module.exports = {
  palindrome,
  average
}
