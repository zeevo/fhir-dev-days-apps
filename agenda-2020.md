App Ideas:
1. Set a Goal and track number of steps (Observation)
Create an Observation using https://loinc.org/41950-7/

# Day 1

* Introduce codesandbox.io and get everyone setup
* Introduce FHIR client library
* Exercises (with open sandbox):
  - Read, Search, Create, Operation (e.g. $validate) resources

# Day 2

* Introduce OAuth2 within context of react app
* Exercises:
  - Query the patient from the launch context
  - Query all observations for that patient and display in a component
  - Write a new Goal
      * description, target.measure (LOINC Code), target.detailInteger
  - Write a new Observation (with LOINC Code), valueInteger
  - Query all observations with that loinc code

# Day 3

* Introduce CDS Hooks (5 mins)
* Stub out /cds-services and a service /step-service
* Exercise:
  - Implement a patient-view step-service (if Obser?code=loinc&_limit=1) if this null, show the card.
  - Create an app-link card to the SMART app we built in day 2

# Day 4

* Bonus: Introduce SWM (SMART Web Messaging)
* Finish the app
* Each person / team demo
