import FHIR from "fhirclient";

const client = new FHIR().client({ serverUrl: "https://r4.smarthealthit.org" });

const GOAL_ID = process.env.GOAL_ID || "";
if (!GOAL_ID) {
  throw new Error("Must set GOAL_ID");
}

// ----------
// Exercise 1: Update the steps goal using a PATCH
// (hint: https://www.hl7.org/fhir/http.html#patch)
// (hint: http://jsonpatch.com/)
// (hint: http://docs.smarthealthit.org/client-js/typedoc/classes/_client_.client.html#request-1)

const goalPatch = [
  {
    op: "replace",
    path: "/target/0/detailInteger",
    value: 4000
  }
];

client
  .request({
    url: `Goal/${GOAL_ID}`,
    method: "PATCH",
    headers: { "Content-Type": "application/json-patch+json" },
    body: JSON.stringify(goalPatch)
  })
  .then((r) => console.dir(r))
  .catch((e) => console.error(e));

