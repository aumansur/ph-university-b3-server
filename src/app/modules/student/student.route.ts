import express from 'express'

import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validetRequest'
import { studentValidations } from './student.validation.zod'
import auth from '../../middlewares/auth'

const router = express.Router()

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  StudentControllers.getSingleStudent,
)

router.patch(
  '/:id',
  auth('admin', 'faculty', 'student'),
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

router.delete('/:id', StudentControllers.deleteStudent)

router.get('/', StudentControllers.getAllStudents)

export const StudentRoutes = router
