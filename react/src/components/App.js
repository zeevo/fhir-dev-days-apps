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

const GreenP = styled.p`
  color: green;
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
        detailRange: {
          low: {
            value: 8000,
            unit: "count",
            system: "http://unitsofmeasure.org",
            code: "{count}",
          },
          high: {
            value: 10000,
            unit: "count",
            system: "http://unitsofmeasure.org",
            code: "{count}",
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
    // outcomeReference: [
    //   {
    //     reference: "Observation/example",
    //     display: "Step count in 24 hr",
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
        <PrettyJson {...makeGoal(patient, goalDescription)} />
        <button form="goal-form">Submit</button>
        {goal ? (
          <p>
            <Green>
              Created a new Goal <PrettyJson {...goal} />
            </Green>
          </p>
        ) : null}
      </Box>
      {/* ) : null} */}
    </Container>
  );
}

export default App;
