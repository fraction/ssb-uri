const ssbUri = require('..')
const test = require('tape');

const example = {
  sigilLink: '%g3hPVPDEO1Aj/uPl0+J2NlhFB2bbFLIHlty+YuqFZ3w=.sha256',
  uri: 'ssb:message:sha256:g3hPVPDEO1Aj_uPl0-J2NlhFB2bbFLIHlty-YuqFZ3w='
}

test('message from sigil link to URI', function (t) {
  t.plan(1);
  const uri = ssbUri.fromSigilLink(example.sigilLink)

  t.equal(uri, example.uri,);
});

test('message to sigil link from URI', function (t) {
  t.plan(1)
  const sigilLink = ssbUri.toSigilLink(example.uri)

  t.equal(sigilLink, example.sigilLink);
});
