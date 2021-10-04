let upperCase = (string) => {

  let capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1)
  let capitalizeSentence = (string) => string.split(' ').map(word => capitalizeWord(word)).join(' ')

  let stringLength = string.split(' ').length
  if (stringLength === 1) {
    return capitalizeWord(string)
  }

  if (stringLength > 1) {
    return capitalizeSentence(string)
  }
}

module.exports = upperCase