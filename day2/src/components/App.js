import React, { useEffect, useState } from "react";
import styled from "styled-components";
import connect from "../services/FhirClient";

const Container = styled.div`
  display: flex;
  margin: 4rem;
  flex-direction: column;
`;

const Green = styled.span`
  color: green;
`;

const Red = styled.span`
  color: red;
`;

const PrettyFormat = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;

function App() {
  const [client, setClient] = useState();
  const [error, setError] = useState();
  const [patient, setPatient] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Attempting SMART on FHIR handshake");
        const fhirclient = await connect();
        setClient(fhirclient);

        // Day2 Spoilers below!
        console.log("Fetching Patient");
        const patient = await fhirclient.request(
          `Patient/${fhirclient.patient.id}`
        );
        setPatient(patient);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <h1>Hello world.</h1>
      {client ? (
        <Green>
          <div>
            {/* Day2 Spoilers */}
            {patient ? <PrettyFormat {...patient} /> : null}
            <PrettyFormat {...client} />
          </div>
        </Green>
      ) : null}
      {error ? <Red>{error.toString()}</Red> : null}
    </Container>
  );
}

export default App;
