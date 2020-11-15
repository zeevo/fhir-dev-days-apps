import express from 'express'
import { authenticateEhr, authenticateClient } from '../middleware/auth.js'

const router = express.Router()

const isToday = (someDate) => {
  const today = new Date()
  return someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
}

const cardsBuilder = (patient, lastStep = null) => {
  if (lastStep && isToday(new Date(lastStep.effectiveDateTime))) {
    // We have steps recorded, send back status...
    return [
      {
        summary: 'Steps were recorded today!',
        indicator: 'info',
        detail: `Logged *${lastStep.valueInteger}* steps for ${patient.name[0].given}. Great work!`
      }
    ]
  } else {
    // We need to record today's steps
    return [
      {
        summary: 'Oops, no steps recorded for today!',
        indicator: 'warning',
        detail: `No steps for ${patient.name[0].given}. You can launch the _SMART_app with the link below.`,
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
  console.info('prefetch', prefetch)

  const { patient, lastStep } = prefetch

  return res.status(200).json({
    cards: cardsBuilder(patient, lastStep)
  })
})

export default router
