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
  //return s.replace(/\+/g, '-').replace(/\//g, '_')
  return encodeURIComponent(s)
}

var semantics = g.createSemantics().addOperation('toSsbUri', {
  sigilLink: function (sigil, base64, dot, commonAlgorithm) {
    let uri = [
      sigil.toSsbUri(),
      commonAlgorithm.toSsbUri(),
      base64.toSsbUri()
    ].join('/')
    return `ssb:${uri}`
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
  const uri = '%EOgRe5ppgaugsqGyoWxJQ3QCFaGV7akjFUQ+9RR1jfk=.sha256'

  console.log(module.exports(uri))
}
