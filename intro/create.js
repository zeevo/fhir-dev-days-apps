import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" })

const PATIENT_ID = '494743a2-fea5-4827-8f02-c2b91e4a4c9e'


// Start with an invalid one

const invalidGoal = {
  resourceType: "Goal",
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
      detailInteger: 10000
    }
  ]
}

client.request({
  url: "Goal/$validate",
  method: "POST",
  headers: { "Content-Type": "application/json+fhir" },
  body: JSON.stringify(invalidGoal)
})
  .then(r => console.dir(r))
  .catch(e => {
    console.error("Validation Error", JSON.stringify(e.body, null, 2))
  })


// Now a vaild one we can create.

const validGoal = {
  resourceType: "Goal",
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
      detailInteger: 10000
    }
  ]
}

client.create(validGoal).then(r => console.dir(r))


// Now make an observation, number of steps today!
