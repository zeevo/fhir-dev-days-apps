# Introduction

We will be creating our own CDS Hooks service to let us know how we are doing
and suggest entering new step data if we are missing.

## Background / Boilerplate Walkthrough

This is an example of a SMART app responding to CDS Hooks requests from an EHR.

In this example, there are two routes:
 - /cds-services
 - /cds-services/steps

The EHR will call the cds-services route (the "discovery endpoint")
in order to configure any available CDS services for this SMART application.

Based on this configuration, the EHR may then post to /cds-services/patient-view
with prefetch data as prescribed by the cds-services discovery route and,
optionally, FHIR authorization details (i.e., access_token and scope). If
an access token is provided, it may then be used by the FHIR client for
requests to the EHR, as seen in the MedicationOrder example.

Before every request, the EHR is first directed through the `authenticateEhr` middleware.

`authenticateEhr` expects a JSON Web Token (JWT) from the EHR's authorization
request header. It is used to establish that the request is from a trusted
party.  The JWT can be verfied by generating a PEM file from a `jku` in the
decoded JWT header.


Exercises:

1. Implement discovery endpoint
2. Develop the steps service
3. Add goal and new card if the last amount is below our goal.
4. *stretch* Assume no prefetch and issue FHIR request subsequently.


