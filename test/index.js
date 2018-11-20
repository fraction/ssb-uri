const ssbUri = require('..')
const test = require('tape');

const message = {
  sigilLink: '%g3hPVPDEO1Aj/uPl0+J2NlhFB2bbFLIHlty+YuqFZ3w=.sha256',
  uri: 'ssb:message:sha256:g3hPVPDEO1Aj_uPl0-J2NlhFB2bbFLIHlty-YuqFZ3w='
}

test('message from sigil link to URI', function (t) {
  t.plan(1);
  const uri = ssbUri.fromSigilLink(message.sigilLink)

  t.equal(uri, message.uri,);
});

test('message to sigil link from URI', function (t) {
  t.plan(1)
  const sigilLink = ssbUri.toSigilLink(message.uri)

  t.equal(sigilLink, message.sigilLink);
});

const feed = {
  sigilLink: '@+oaWWDs8g73EZFUMfW37R/ULtFEjwKN/DczvdYihjbU=.ed25519',
  uri: 'ssb:feed:ed25519:-oaWWDs8g73EZFUMfW37R_ULtFEjwKN_DczvdYihjbU='
}

test('feed from sigil link to URI', function (t) {
  t.plan(1);
  const uri = ssbUri.fromSigilLink(feed.sigilLink)

  t.equal(uri, feed.uri,);
});

test('feed to sigil link from URI', function (t) {
  t.plan(1)
  const sigilLink = ssbUri.toSigilLink(feed.uri)

  t.equal(sigilLink, feed.sigilLink);
});
