# Introduction

There are lots of ways to interact with FHIR. And there are lots of ways in the
JS ecosystem. We will be basing our sessions on the fhirclient.js library by
the SMART group.

We will also be using smarthealthit for our FHIR server, and later our launch
sandbox. Let's take a quick look at that while we are at it.

* https://r4.smarthealthit.org

Now a quick review of this library we will be using:

* http://docs.smarthealthit.org/client-js/

Then hands-on-keyboard!

## capabilities.js

Let's look at the server we are connecting to and what it can do for us.

## search.js

Using the FHIR search API with javascript. We will do simple searches, as well
as how to combine several referenced resources in a single request. Last, we
will use javascript to follow paginated results.

## read.js

Reading resources is a snap! Let's read a patient. We will learn how to cut
down on payload size with the summary feature, and querying for individual
elements.

## create.js

Now let's create some resources. We can see how to execute an operation as well
(to check validation).

We will create a goal for our patient from before. And then an observation
toward that goal. Locomotion!

## delete.js

Let's delete that last Observation, we didn't really do that many steps :).

## update.js

It turns out we were a bit ambitious with our daily goal. Let's do an update
operation where we replace the entire Goal with a new one.

## patch.js

Hmm. That still seems high. But now instead of replacing the entire goal, we
will try our a PATCH operation to update just a part of the resource.

---

# Done

Nice work! Please play around with what you learned thus far. Tomorrow we will
be taking what we learned here and putting them into a SMART app using React!

