// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Router } from 'express'
import validateRequest from '../../middlewares/validetRequest'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'

const router = Router()

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)
router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations)
router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistrations,
)
router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistrations,
)

export const SemesterRegistrationRoutes = router
