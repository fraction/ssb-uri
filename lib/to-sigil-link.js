var fs = require('fs')
var path = require('path')
var ohm = require('ohm-js')

const grammarPath = path.join(__dirname, './grammar/ssb-uri.ohm')
var g = ohm.grammar(fs.readFileSync(grammarPath))

const sigils = {
  feed: '@',
  message: '%',
  blob: '&',
  channel: '#'
}

const unsafe64 = (s) => {
  return decodeURIComponent(s)
}

var semantics = g.createSemantics().addOperation('toSigilLink', {
  uriCommon: function (scheme, commonType, commonAlgorithm, encodedBase64) {
    return [
      commonType.toSigilLink(),
      encodedBase64.toSigilLink(),
      '.',
      commonAlgorithm.toSigilLink()
    ].join('')
  },
  commonType: function (commonTypePart) {
    return commonTypePart.toSigilLink()
  },
  commonTypePart: function (part) {
    return sigils[this.sourceString]
  },
  commonAlgorithm: function (delimiter, commonAlgorithmPart) {
    return commonAlgorithmPart.toSigilLink()
  },
  commonAlgorithmParts: function (part) {
    return this.sourceString
  },
  encodedBase64: function (delimiter, base64Parts) {
    return unsafe64(base64Parts.toSigilLink().join(''))
  },
  base64Parts: function (part) {
    return this.sourceString
  }
})

module.exports = (uri) => {
  const match = g.match(uri)
  return semantics(match).toSigilLink()
}

if (!module.parent) {
  const uri = 'ssb:message/sha256/EOgRe5ppgaugsqGyoWxJQ3QCFaGV7akjFUQ%2B9RR1jfk%3D'

  console.log(module.exports(uri))
}
