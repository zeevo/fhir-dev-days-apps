import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: 'https://r4.smarthealthit.org' })

const PATIENT_ID = process.env.PATIENT_ID || ''
if (!(PATIENT_ID)) { throw new Error('Must set PATIENT_ID') }

// Start with an invalid one
const invalidGoal = {
  resourceType: 'Goal',
  description: {
    text: 'Meet a reasonable number of steps per day.'
  },
  subject: {
    'reference': `Patient/${PATIENT_ID}`
  },
  target: [
    {
      measure: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '41950-7',
            display: 'Number of steps in 24 hour Measured'
          }
        ]
      },
      detailInteger: 10000
    }
  ]
}

client.request({
  url: 'Goal/$validate',
  method: 'POST',
  headers: { 'Content-Type': 'application/json+fhir' },
  body: JSON.stringify(invalidGoal)
})
  .then(r => console.dir(r))
  .catch(e => {
    console.error('Validation Error', JSON.stringify(e.body, null, 2))
  })


// Now a vaild one we can create.

const validGoal = {
  resourceType: 'Goal',
  lifecycleStatus: 'active',
  description: {
    text: 'Meet a reasonable number of steps per day.'
  },
  subject: {
    'reference': `Patient/${PATIENT_ID}`
  },
  target: [
    {
      measure: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '41950-7',
            display: 'Number of steps in 24 hour Measured'
          }
        ]
      },
      detailInteger: 10000
    }
  ]
}

client.create(validGoal).then(r => console.dir(r))


// Now make an observation, number of we steps today!
const stepObservation = {
  resourceType: 'Obervation',
  status: 'active',
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '41950-7',
        display: 'Number of steps in 24 hour Measured'
      }
    ]
  },
  subject: {
    reference: `Patient/${PATIENT_ID}`
  },
  effectiveDateTime: new Date().toISOString().slice(0, 10),
  valueInteger: 10000
}
client.create(stepObservation)
  .then(r => console.dir(r))
  .catch(e => console.error(e))

// NOTE: Keep track of the ID of that last observation, we will be using it in
// future exercises!
