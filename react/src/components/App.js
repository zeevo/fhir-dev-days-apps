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

const Green = styled.span`
  color: green;
`;

const Red = styled.span`
  color: red;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const makeGoal = (
  patient = {
    id: "example",
    name: [{ given: ["Abby"], family: "Smith" }],
  },
  description = "weight"
) => {
  return {
    resourceType: "Goal",
    text: {
      status: "additional",
      div:
        '<div xmlns="http://www.w3.org/1999/xhtml"><p> A goal to do 8000-10000 steps a day</p></div>',
    },
    description: {
      text: description,
    },
    lifecycleStatus: "active",
    target: [
      {
        measure: {
          coding: [
            {
              system: "http://loinc.org",
              code: "41950-7",
              display: "Number of steps in 24 hour Measured",
            },
          ],
        },
        detailInter: 10000,
        dueDate: "2020-12-25",
      },
    ],
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/goal-category",
            code: "physiotherapy",
          },
        ],
      },
    ],
    subject: {
      reference: `Patient/${patient?.id}`,
      display: `${patient?.name[0].given[0]} ${patient?.name[0].family}`,
    },
    startDate: new Date(),
  };
};

const makeObservation = (
  patient = {
    id: "example",
    name: [{ given: ["Abby"], family: "Smith" }],
  },
  stepCount
) => {
  return {
    resourceType: "Observation",
    text: {
      status: "generated",
      div:
        '<div xmlns="http://www.w3.org/1999/xhtml"><p>Number of steps in 24 hr</p></div>',
    },
    status: "final",
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "41950-7",
          display: "Number of steps in 24 hour Measured",
        },
      ],
    },
    subject: {
      reference: `Patient/${patient.id}`,
      display: `${patient?.name[0].given[0]} ${patient?.name[0].family}`,
    },
    effectivePeriod: {
      start: "2013-04-02T09:30:10+01:00",
    },
    issued: new Date(),
    valueInteger: stepCount,
  };
};

const prettyJson = (props) => JSON.stringify(props, null, 2);

function App() {
  const [client, setClient] = useState({});
  const { register, watch, handleSubmit } = useForm();
  const [patient, setPatient] = useState();
  const [goal, setGoal] = useState();
  const [observation, setObservation] = useState();

  const { goalDescription, stepCount } = watch();

  const createGoal = async (data) => {
    const goal = makeGoal(patient, goalDescription);

    const req = await client.request({
      url: "Goal",
      method: "POST",
      body: JSON.stringify(goal),
      headers: {
        "Content-Type": "application/fhir+json",
      },
    });

    setGoal(req);
  };

  const createObservation = async () => {
    const observation = makeObservation(patient, stepCount);

    const req = await client.request({
      url: "Observation",
      method: "POST",
      body: JSON.stringify(observation),
      headers: {
        "Content-Type": "application/fhir+json",
      },
    });

    setObservation(req);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fhirclient = await connect();

        setClient(fhirclient);

        const patient = await fhirclient.request(
          `Patient/${fhirclient.patient.id}`
        );

        setPatient(patient);
      } catch (e) {
        console.log(e);
      }
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
        <p>
          SMART on FHIR launch status:
          {client.patient ? <Green> Connected</Green> : <Red> Unconnected</Red>}
        </p>
        {patient ? (
          <>
            <Flex>
              <p>Patient ID: </p>
              <p>
                <Green>{patient.id}</Green>
              </p>
            </Flex>
            <Flex>
              <p>Patient Name: </p>
              <p>
                <Green>
                  {patient.name[0].given[0]} {patient.name[0].family}
                </Green>
              </p>
            </Flex>
          </>
        ) : null}
      </Box>

      {/* {patient ? ( */}
      <Box style={{ flex: "1" }}>
        <form id="goal-form" onSubmit={handleSubmit(createGoal)}>
          <label>Create a goal:</label>
          <input
            placeholder="Description"
            ref={register}
            name="goalDescription"
          ></input>
        </form>

        <textarea
          style={{
            width: "100%",
          }}
          rows={25}
          value={prettyJson(makeGoal(patient, goalDescription))}
          disabled
        />
        <div>
          <button form="goal-form">Submit</button>
        </div>
        {goal ? (
          <>
            <p>Success!</p>
            <textarea
              style={{
                width: "100%",
                color: "green",
              }}
              rows={25}
              value={prettyJson(goal)}
              disabled
            />
          </>
        ) : null}
      </Box>

      <Box style={{ flex: "1" }}>
        <form id="observation-form" onSubmit={handleSubmit(createObservation)}>
          <label>Create an Observation:</label>
          <input
            placeholder="Step Count for today"
            ref={register}
            name="stepCount"
          ></input>
        </form>
        <textarea
          style={{
            width: "100%",
          }}
          rows={25}
          value={prettyJson(makeObservation(patient, stepCount))}
          disabled
        />
        <div>
          <button form="observation-form">Submit</button>
        </div>
        {observation ? (
          <>
            <p>Success!</p>
            <textarea
              style={{
                width: "100%",
                color: "green",
              }}
              rows={25}
              value={prettyJson(observation)}
              disabled
            />
          </>
        ) : null}
      </Box>
    </Container>
  );
}

export default App;
