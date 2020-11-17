import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

// Exercise 1: Create a transactions

const bundle = {
  resourceType: "Bundle",
  type: "transaction",
  entry: [
    {
      fullUrl: "http://acme.com/Observation/observation-1",
      resource: {
        resourceType: "Observation",
        status: "final",
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "41950-7",
              display: "Number of steps in 24 hour Measured"
            }
          ]
        },
        subject: {
          reference: `Patient/patient-1`
        },
        effectiveDateTime: "2020-01-01",
        valueInteger: 10000
      },
      request: {
        method: "POST",
        url: "/Observation"
      }
    },
    {
      fullUrl: "http://acme.com/Patient/patient-1",
      resource: {
        resourceType: "Patient",
        name: [
          {
            family: "McAcme"
          }
        ]
      },
      request: {
        method: "POST",
        url: "/Observation"
      }
    }
  ]
};

client
  .request({
    url: `/`,
    method: "POST",
    headers: { "Content-Type": "application/json+fhir" },
    body: JSON.stringify(bundle)
  })
  .then((r) => console.dir(JSON.stringify(r, null, 2)))
  .catch((e) => console.error(e));

