const isOneOf = (candidate, ...args) => {
  return args.some(arg => arg === candidate)
}

module.exports = isOneOf
