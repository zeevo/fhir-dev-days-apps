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

Before every request, the EHR is first directed through the `authenticateEHR` middleware.

`authenticateEHR` expects a JSON Web Token (JWT) from the EHR's authorization
request header. It is used to establish that the request is from a trusted party.
The JWT can be verified by one of 3 different ways in this example:

 1) By setting a PEM file in the current directory on line 15.
 2) By generating a PEM file from a `jku` variable set on line 16.
 3) By generating a PEM file from a `jku` in the decoded JWT header.



