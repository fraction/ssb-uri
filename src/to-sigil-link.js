var fs = require('fs');
var path = require('path')
var ohm = require('ohm-js')

const grammarPath = path.join(__dirname, './grammar/ssb-uri.ohm')
var g = ohm.grammar(fs.readFileSync(grammarPath));

const sigils = {
  feed: '@',
  message: '%',
  blob: '&',
  channel: '#'
}

const unsafe64 = (s) => {
  return s.replace('-', '+').replace('_', '/')
}

var semantics = g.createSemantics().addOperation('toSigilLink', {
  uriCommon: function (scheme, commonType, commonAlgorithm, integerBase64) {
    return [
      commonType.toSigilLink(),
      integerBase64.toSigilLink(),
      '.',
      commonAlgorithm.toSigilLink()
    ].join('')
  },
  commonType: function (delimiter, commonTypePart) {
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
  integerBase64: function (delimiter, base64Parts) {
    return base64Parts.toSigilLink().join('')
  },
  base64Parts: function (part) {
    return unsafe64(this.sourceString)
  }
});

module.exports = (uri) => {
  const match = g.match(uri)
  return semantics(match).toSigilLink()
}

if (!module.parent) {
  const uri = 'ssb:message:sha256:aUHk2iZgb7QPZVP5EWyJhW7EsZzgvlx3_VCrCOQYSZ0='

  console.log(module.exports(uri))
}
