import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: 'https://r4.smarthealthit.org' })

const PATIENT_ID = process.env.PATIENT_ID || ''
if (!(PATIENT_ID)) { throw new Error('Must set PATIENT_ID') }

// Read 1: Read the patient
client.request(`Patient/${PATIENT_ID}`)
  .then(r => console.dir(r))

// Read 2: Patient summary
client.request(`Patient/${PATIENT_ID}?_summary=true`)
  .then(r => console.dir(r))

// Read 3: Patient name only
client.request(`Patient/${PATIENT_ID}?_elements=name`)
  .then(r => console.dir(r))
