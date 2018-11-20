var fs = require('fs')
var ohm = require('ohm-js')
var path = require('path')

const grammarPath = path.join(__dirname, './grammar/ssb-sigil-link.ohm')
var g = ohm.grammar(fs.readFileSync(grammarPath))

const sigils = {
  '@': 'feed',
  '%': 'message',
  '&': 'blob',
  '#': 'channel'
}

const safe64 = (s) => {
  return s.replace('+', '-').replace('/', '_')
}

var semantics = g.createSemantics().addOperation('toSsbUri', {
  sigilLink: function (sigil, base64, dot, commonAlgorithm) {
    return [
      'ssb',
      sigil.toSsbUri(),
      base64.toSsbUri(),
      commonAlgorithm.toSsbUri()
    ].join(':')
  },
  sigil: function (str) {
    return sigils[this.sourceString]
  },
  base64: function (str) {
    return safe64(this.sourceString)
  },
  commonAlgorithm: function (alg) {
    return this.sourceString
  }
})

module.exports = (uri) => {
  const match = g.match(uri)
  return semantics(match).toSsbUri()
}

if (!module.parent) {
  const uri = '%aUHk2iZgb7QPZVP5EWyJhW7EsZzgvlx3/VCrCOQYSZ0=.sha256'

  console.log(module.exports(uri))
}
