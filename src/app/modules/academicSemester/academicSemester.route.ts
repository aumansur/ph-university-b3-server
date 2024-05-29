import express from 'express'
import { AcademicSemesterControllers } from './AcademicSemester.controller'
import validateRequest from '../../middlewares/validetRequest'
import { AcademicSemesterValidations } from './academicSemester.validation.zod'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)
router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

export const AcademicSemesterRoutes = router
