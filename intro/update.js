import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: 'https://r4.smarthealthit.org' })

const PATIENT_ID = process.env.PATIENT_ID || ''
if (!(PATIENT_ID)) { throw new Error('Must set PATIENT_ID') }

const GOAL_ID = process.env.GOAL_ID || ''
if (!(GOAL_ID)) { throw new Error('Must set GOAL_ID') }


const updateGoal = {
  resourceType: 'Goal',
  id: GOAL_ID,
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
      detailInteger: 5000
    }
  ]
}

client.update(updateGoal)
  .then(r => console.dir(r))
  .catch(e => console.error(e))
