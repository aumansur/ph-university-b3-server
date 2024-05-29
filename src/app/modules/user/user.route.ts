import express from 'express'
import { UserControllers } from './user.controller'

import { StudentValidations } from '../student/student.validation.zod'
import validateRequest from '../../middlewares/validetRequest'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(StudentValidations.studentValidationSchemaZod),
  UserControllers.createStudent,
)

export const UserRoutes = router
