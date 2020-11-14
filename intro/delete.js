import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" })

const OBSERVATION_ID = process.env.OBSERVATION_ID || ''
if (!(OBSERVATION_ID)) { throw new Error('Must set OBSERVATION_ID') }

// Delete: Observation, 10000 is a lot!
client.delete(`Observation/${OBSERVATION_ID}`)
  .then(r => console.dir(r))
  .catch(e => console.error(e))

