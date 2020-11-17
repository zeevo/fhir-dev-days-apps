import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

// ----------
// Exercise 1: Create a function to request the capability statement
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#request-1)
// (hint: https://www.hl7.org/fhir/http.html#capabilities)
function capabilityStatement() {
  return client.request("metadata");
}

function serverCapabilities() {
  return capabilityStatement().then((statement) => {
    return statement.rest.find(
      (capabilities) => capabilities.mode === "server"
    );
  });
}

// ----------
// Exercise 2: How many resources does the server support?
serverCapabilities().then((r) => console.dir(r.resource.length));

// ----------
// Exercise 3: (bonus): Does the server support transactions?
serverCapabilities().then((r) =>
  console.dir(r.interaction.some((i) => i.code === "transaction"))
);

