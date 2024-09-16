import express from 'express'

import { UserControllers } from './user.controller'
import validateRequest from '../../middlewares/validetRequest'
import { UserValidation } from './user.validation.zod'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { createAdminValidationSchema } from '../admin/admin.validation'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

export const UserRoutes = router
