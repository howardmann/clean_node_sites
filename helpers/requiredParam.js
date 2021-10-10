let requiredParam = (param, property) => {
  if (param === undefined || param === null) {
    throw new Error(`${property} can not be null or undefined.`)
  }
  return param
}

module.exports = requiredParam