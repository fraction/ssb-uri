module.exports = `
ssbSigilLink {

  sigilLink = sigil base64 "." commonAlgorithm
  
  sigil = "@" | "%" | "&" 
 
  commonAlgorithm = "sha256" | "ed25519"
  
  base64
    = (
      alnum
      | "+"
      | "/"
      | "="
    )*
}
`