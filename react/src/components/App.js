import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import connect from "../services/FhirClient";

const Container = styled.div`
  display: flex;
  margin: 2rem;
  justify-content: center;
`;

const Box = styled.div`
  padding: 5px;
  flex: 1;
`;

const Green = styled.p`
  color: green;
`;

const Red = styled.p`
  color: red;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const makeGoal = (patient, description) => {
  return {
    resourceType: "Goal",
    text: {
      status: "additional",
      div:
        '<div xmlns="http://www.w3.org/1999/xhtml"><p> A goal to lose weight</p></div>',
    },
    lifecycleStatus: "active",
    target: [
      {
        measure: {
          coding: [
            {
              system: "http://loinc.org",
              code: "3141-9",
              display: "Weight Measured",
            },
          ],
        },
        detailRange: {
          low: {
            value: 160,
            unit: "lbs",
            system: "http://unitsofmeasure.org",
            code: "[lb_av]",
          },
          high: {
            value: 180,
            unit: "lbs",
            system: "http://unitsofmeasure.org",
            code: "[lb_av]",
          },
        },
        dueDate: "2020-12-25",
      },
    ],
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/goal-category",
            code: "dietary",
          },
        ],
      },
    ],
    description: {
      text: description,
    },
    subject: {
      reference: `Patient/${patient.id}`,
      display: `${patient.name[0].given[0]} ${patient.name[0].family}`,
    },
    startDate: new Date().toLocaleDateString(),
    // outcomeReference: [
    //   {
    //     reference: "Observation/example",
    //     display: "Body Weight Measured",
    //   },
    // ],
  };
};

const PrettyJson = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;

function App() {
  const [client, setClient] = useState({});
  const { register, getValues, watch, handleSubmit } = useForm();
  const [patient, setPatient] = useState();
  const [goal, setGoal] = useState();

  const { goalDescription } = watch();

  const createGoal = async (data) => {
    console.log(data);
    const req = await client.request({
      url: "Goal",
      method: "POST",
    });
    console.log(req);
  };

  console.log(getValues());

  useEffect(() => {
    const fetchData = async () => {
      const fhirclient = await connect();

      setClient(fhirclient);

      const patient = await fhirclient.request(
        `Patient/${fhirclient.patient.id}`
      );

      setPatient(patient);
    };
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
        <Flex>
          <p>SMART on FHIR launch status:</p>
          {client.patient ? <Green>Connected</Green> : <Red>Unconnected</Red>}
        </Flex>
        {patient ? (
          <>
            <Flex>
              <p>Patient ID: </p>
              <Green>{patient.id}</Green>
            </Flex>
            <Flex>
              <p>Patient Name: </p>
              <Green>
                {patient.name[0].given[0]} {patient.name[0].family}
              </Green>
            </Flex>
          </>
        ) : null}
      </Box>

      {patient ? (
        <Box>
          <form id="goal-form" onSubmit={handleSubmit(createGoal)}>
            <label>Create a goal:</label>
            <input
              placeholder="Description"
              ref={register}
              name="goalDescription"
            ></input>
          </form>
          <PrettyJson {...makeGoal(patient, goalDescription)} />
          <button form="goal-form">Submit</button>
        </Box>
      ) : null}
    </Container>
  );
}

export default App;
