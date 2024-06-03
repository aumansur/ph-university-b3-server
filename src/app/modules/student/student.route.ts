import express from 'express'

import { StudentControllers } from './student.controller'
import validateRequest from '../../middlewares/validetRequest'
import { studentValidations } from './student.validation.zod'

const router = express.Router()

router.get('/:studentId', StudentControllers.getSingleStudent)

router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

router.delete('/:studentId', StudentControllers.deleteStudent)

router.get('/', StudentControllers.getAllStudents)

export const StudentRoutes = router
