import express, { Router } from 'express'
import validateRequest from '../../middlewares/validetRequest'
import { FacultyValidation } from './academicFaculty.validation'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = Router()
router.post(
  '/create-academic-faculty',
  validateRequest(FacultyValidation.createAcademicFacultySchemaValidationZod),
  AcademicFacultyControllers.createAcademicFaculty,
)

router.patch(
  '/:facultyId',
  validateRequest(FacultyValidation.updateAcademicFacultySchemaValidationZod),
  AcademicFacultyControllers.updateAcademicFaculty,
)

router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)
router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty)
export const AcademicFacultyRoutes = router
