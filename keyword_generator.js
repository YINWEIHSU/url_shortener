function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function generateLastKeyword(wordsLength) {
  const numbers = '1234567890'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()

  let collection = numbers.split('').concat(upperCaseLetters.split(''), lowerCaseLetters.split(''))

  let lastKeyword = ''
  for (let i = 0; i < wordsLength; i++) {
    lastKeyword += sample(collection)
  }

  return lastKeyword

}

module.exports = generateLastKeyword
