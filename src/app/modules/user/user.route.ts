import express from 'express'

import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validetRequest'
import { UserValidation } from './user.validation.zod'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
)

export const UserRoutes = router
