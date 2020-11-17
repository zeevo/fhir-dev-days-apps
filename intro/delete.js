import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

const OBSERVATION_ID = process.env.OBSERVATION_ID || "";
if (!OBSERVATION_ID) {
  throw new Error("Must set OBSERVATION_ID");
}

// ----------
// Exercise 1: Delete Observation, 10000 is a lot!
// (hint: https://www.hl7.org/fhir/http.html#delete)
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#delete)
client
  .delete(`Observation/${OBSERVATION_ID}`)
  .then((r) => console.dir(r))
  .catch((e) => console.error(e));
