const { palindrome } = require('../utils/testing')

test('palindrome of carlos', () => {
  const result = palindrome('carlos')

  expect(result).toBe('solrac')
})

test('palindrome of carlos', () => {
  const result = palindrome('')

  expect(result).toBe('')
})

test('palindrome of undefined', () => {
  const result = palindrome()

  expect(result).toBeUndefined()
})
