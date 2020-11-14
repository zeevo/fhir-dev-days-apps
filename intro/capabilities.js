import FHIR from 'fhirclient'

const client = new FHIR().client({ serverUrl: 'https://r4.smarthealthit.org' })

async function capabilityStatement() {
  return await client.request('metadata')
}

async function serverCapabilities() {
  const statement = await capabilityStatement();
  return statement.rest.find((capabilities) => (
    capabilities.mode === 'server'
  ));
 }

// What version of FHIR does the server support?
capabilityStatement()
  .then(r => console.dir(r.fhirVersion))

// How many resources does the server support?
serverCapabilities()
  .then(r => console.dir(r.resource.length))

// Does the server support transactions?
serverCapabilities()
  .then(r => console.dir(r.interaction.some(i => i.code === 'transaction')))

