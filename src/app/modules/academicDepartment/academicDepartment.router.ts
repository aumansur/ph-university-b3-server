import express, { Router } from 'express'
import validateRequest from '../../middlewares/validetRequest'
import { DepartmentValidation } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = Router()
router.post(
  '/create-academic-department',
  validateRequest(
    DepartmentValidation.createAcademicDepartmentSchemaValidationZod,
  ),
  AcademicDepartmentControllers.createAcademicDepartment,
)

router.patch(
  '/:departmentId',
  validateRequest(
    DepartmentValidation.updateAcademicDepartmentSchemaValidationZod,
  ),
  AcademicDepartmentControllers.updateAcademicDepartment,
)

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)
router.get(
  '/:facultyId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
)
export const AcademicDepartmentRoutes = router
