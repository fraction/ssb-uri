module.exports = `
ssbURI {

  uriCommon =
    scheme
    delimiter
    type
    delimiter
    algorithm
    delimiter
    base64*

  scheme = "ssb"

  delimiter = ":"

  type = "feed" | "message" | "blob" | "channel"

  algorithm = "sha256" | "ed25519"

  base64 = alnum | "-" | "_" | "="

}
`
