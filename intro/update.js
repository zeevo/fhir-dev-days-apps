import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" })

const PATIENT_ID = '494743a2-fea5-4827-8f02-c2b91e4a4c9e'
const GOAL_ID = ''


// Update / replace

const updateGoal = {
  resourceType: "Goal",
  id: GOAL_ID,
  lifecycleStatus: "active",
  description: {
    text: "Meet a reasonable number of steps per day."
  },
  subject: {
    "reference": `Patient/${PATIENT_ID}`
  },
  target: [
    {
      measure: {
        coding: [
          {
            system: "http://loinc.org",
            code: "41950-7",
            display: "Number of steps in 24 hour Measured"
          }
        ]
      },
      detailInteger: 5000
    }
  ]
}

client.update(updateGoal).then(r => console.dir(r))
