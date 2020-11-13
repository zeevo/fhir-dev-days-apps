import React, { useEffect, useState } from "react";
import styled from "styled-components";
import connect from "../services/FhirClient";

const Container = styled.div`
  display: flex;
  margin: 2rem;
  justify-content: center;
`;

const Box = styled.div`
  padding: 5px;
`;

const Green = styled.span`
  color: green;
`;

const Red = styled.span`
  color: red;
`;

const PrettyFormat = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;

function App() {
  const [client, setClient] = useState({});
  const [error, setError] = useState();
  const [patient, setPatient] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const fhirclient = await connect();
        setClient(fhirclient);

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
      <Box>
        <h1>FHIR App Starter</h1>
        <p>Quick links:</p>
        <ul>
          <li>
            <a href="http://hl7.org/fhir/smart-app-launch/">
              SMART on FHIR HL7 documentation
            </a>
          </li>
          <li>
            <a href="https://reactjs.org/tutorial/tutorial.html">
              React tutorial
            </a>
          </li>
        </ul>
      </Box>
      <Box>
        <input></input>
      </Box>
      <Box>
        <p>
          SMART on FHIR launch status:{" "}
          {client.patient ? <Green>Connected</Green> : <Red>Unconnected</Red>}
        </p>
      </Box>
    </Container>
  );
}

export default App;
