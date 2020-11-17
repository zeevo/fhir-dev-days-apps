import express from 'express'
import { authenticateEhr, authenticateClient } from '../middleware/auth.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

const cardsBuilder = (patient, lastSteps = {}) => {
  const lastStep = lastSteps.entry && lastSteps.entry[0].resource

  if (lastStep && isToday(new Date(lastStep.effectiveDateTime))) {
    // We have steps recorded, send back status...
    return [
      {
        uuid: uuidv4(),
        summary: 'Steps were recorded today!',
        indicator: 'info',
        detail: `Logged *${lastStep.valueInteger}* steps for ${patient.name[0].given}. Great work!`,
        source: {
          label: 'Steptracker 2000'
        }
      }
    ]
  } else {
    // We need to record today's steps, there isn't one
    return [
      {
        uuid: uuidv4(),
        summary: 'Oops, no steps recorded for today!',
        indicator: 'warning',
        detail: `No steps for ${patient.name[0].given}. You can launch the _SMART app_ with the link below.`,
        source: {
          label: 'Steptracker 2000'
        },
        links: [
          {
            label: 'Record steps for today',
            url: 'http://localhost:3001/launch',
            type: 'smart'
          }
        ]
      }
    ]
  }
}

// Respond to calling the hook
router.post('/', [authenticateEhr, authenticateClient], async (req, res) => {
  const { body, fhirClient } = req
  const { prefetch } = body
  const { patient, lastStepBundle } = prefetch

  return res.status(200).json({
    cards: cardsBuilder(patient, lastStepBundle)
  })
})

export default router
