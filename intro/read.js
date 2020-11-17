import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

const PATIENT_ID = process.env.PATIENT_ID || "";
if (!PATIENT_ID) {
  throw new Error("Must set PATIENT_ID");
}

// Exercise 1: Read patient
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#request-1)
// (hint: https://www.hl7.org/fhir/http.html#read)
client.request(`Patient/${PATIENT_ID}`).then((r) => console.dir(r));

// Exercise 2: Patient summary
// (hint https://www.hl7.org/fhir/search.html#summary)
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#request-1)
client
  .request(`Patient/${PATIENT_ID}?_summary=true`)
  .then((r) => console.dir(r));

// Exercise 3: Patient name only
// (hint: https://www.hl7.org/fhir/search.html#elements)
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#request-1)
client
  .request(`Patient/${PATIENT_ID}?_elements=name`)
  .then((r) => console.dir(r));
