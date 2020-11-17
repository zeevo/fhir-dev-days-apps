import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

// Search 1: patients
client.request("Patient")
  .then((r) => console.dir(r.entry));

//// NOTE: Pick a patient ID here! You will be using it in later exercise!

// Search 2: first Observation
client
  .request("Observation?_count=1")
  .then((r) => console.dir(r));

// Search 3: 1st condition and include the subject
client
  .request("Condition?_count=1&_include=Condition:subject")
  .then((r) => console.dir(r));

// Exercise 4: 1st patient, reverse include any related encounters
client
  .request("Patient?_count=1&_revinclude=Encounter:patient")
  .then((r) => console.dir(r));

// Exercise 5: (bonus) second page of patients
client.request("Patient").then((r) => {
  const { link } = r;
  const nextLink = link.find((l) => l.relation === "next");
  if (nextLink) {
    client.request(nextLink).then((r) => console.dir(r));
  }
});
