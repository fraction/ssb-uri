# ssb-uri

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> convert between SSB sigil links and SSB URIs

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install --save ssb-uri
```

## Usage

```
const ssbUri = require('ssb-uri')

ssbUri.fromSigilLink('%g3hPVPDEO1Aj/uPl0+J2NlhFB2bbFLIHlty+YuqFZ3w=.sha256')
// => 'ssb:message:sha256:g3hPVPDEO1Aj_uPl0-J2NlhFB2bbFLIHlty-YuqFZ3w='

ssbUri.toSigilLink('ssb:message:sha256:g3hPVPDEO1Aj_uPl0-J2NlhFB2bbFLIHlty-YuqFZ3w=')
// => '%g3hPVPDEO1Aj/uPl0+J2NlhFB2bbFLIHlty+YuqFZ3w=.sha256'
```

## API

### `ssbUri.fromSigilLink(sigilLinkString)`

Takes an SSB sigil link as input and returns an SSB URI. Any errors are thrown.

### `ssbUri.toSigilLink(sigilLinkString)`

Takes an SSB URI as input and returns an SSB sigil link. Any errors are thrown.

## Maintainers

[@fraction](https://github.com/fraction)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Fraction
