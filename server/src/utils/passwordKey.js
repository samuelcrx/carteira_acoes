const stripchar = require('stripchar').StripChar
const accents = require('remove-accents')
const md5 = require('md5')

const normalize = (fields) => {
  var normalString = fields.join('#')
  normalString = accents.remove(normalString).toLowerCase()
  normalString = normalString.replace(/\s/g, '')
  normalString = stripchar.RSExceptUnsAlpNum(normalString)

  return (md5(normalString))
}

module.exports = normalize