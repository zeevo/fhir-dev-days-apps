import express from 'express'

const router = express.Router()

const prefetch = {
  patient: 'Patient/{{context.patientId}}',
  lastStep: 'Observation?subject={{context.patientId}}&code=http://loinc.org|41950-7_sort=effectiveDate&_count=1'
}

const stepService = {
  hook: 'patient-view',
  id: 'steps',
  title: 'Patient daily steps',
  description: 'A CDS service for daily steps.',
  prefetch
}

// CDS Hooks service endpoint
router.get('/', async (req, res) => res.status(200).json({
  services: [stepService]
}))

export default router
