var ohm = require('ohm-js')

var g = ohm.grammar(require('./grammar/ssb-uri.ohm'))

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
  uriCommon: function (
    scheme,
    delimiter1,
    type,
    delimiter2,
    algorithm,
    delimiter3,
    base64
  ) {
    return [
      type.toSigilLink(),
      base64.toSigilLink().join(''),
      '.',
      algorithm.toSigilLink()
    ].join('')
  },
  type: function (_) {
    return sigils[this.sourceString]
  },
  algorithm: function (_) {
    return this.sourceString
  },
  base64: function (part) {
    return unsafe64(this.sourceString)
  },
  _terminal: () => this.sourceString
})

module.exports = (uri) => {
  const match = g.match(uri)
  return semantics(match).toSigilLink()
}

if (!module.parent) {
  const uri = 'ssb:message:sha256:aUHk2iZgb7QPZVP5EWyJhW7EsZzgvlx3_VCrCOQYSZ0='

  console.log(module.exports(uri))
}
