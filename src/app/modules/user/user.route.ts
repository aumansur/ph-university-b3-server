import express from 'express'

import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validetRequest'
import { createStudentValidationSchema } from '../student/student.validation.zod'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

export const UserRoutes = router
