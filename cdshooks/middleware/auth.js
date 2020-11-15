import FHIR from 'fhirclient'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import jwkToPem from 'jwk-to-pem'

const allowed = [
  { iss: 'https://sandbox.cds-hooks.org', sub: '48163c5e-88b5-4cb3-92d3-23b800caa927' }
]

export async function authenticateEhr (req, res, next) {
  const token = req.headers.authorization.replace('Bearer ', '')
  const decodedJwt = jwt.decode(token, { complete: true })
  const asymmetricAlgs = ['ES256', 'ES384', 'ES384', 'RS256', 'RS384', 'RS512']
  const { alg, jku, kid } = decodedJwt.header
  const { iss, sub } = decodedJwt.payload

  const isAllowed = allowed.find((ehr) => ehr.iss === iss && ehr.sub === sub)
  if (!isAllowed) { return res.status(401).json('Authentication failed') }

  let pem
  let verified

  console.info(`token: ${token}`)
  console.info(`decodedJwt: ${JSON.stringify(decodedJwt)}`)

  if (asymmetricAlgs.includes(alg)) {
    if (typeof jku !== 'undefined') {
      // Generate public key with an jwks.json endpoint
      const jwks = await axios.get(jku)
      const targetJwk = jwks.data.keys.find((key) => key.kid === kid)

      pem = jwkToPem(targetJwk)
    } else {
      return res.status(401).json('Authentication failed, `jku` not defined!')
    }

    try {
      verified = jwt.verify(token, pem, { algorithms: [alg] })
      console.info('Verified with PEM')
    } catch (error) {
      console.error('Invalid Token Error', error.message)
      return res.status(401).json('Authentication failed')
    }
  }

  console.info(`Authenticated Token: ${JSON.stringify(verified)}`)

  return next()
}

export async function authenticateClient (req, res, next) {
  const { fhirServer: serverUrl, fhirAuthorization } = req.body

  req.fhirClient = new FHIR().client({ serverUrl })

  if (typeof fhirAuthorization === 'undefined') {
    return next()
  }

  console.info('The token is : ', fhirAuthorization.access_token)
  req.fhirClient.tokenResponse = fhirAuthorization.access_token

  return next()
}
