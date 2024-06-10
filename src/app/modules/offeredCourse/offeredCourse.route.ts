import { Router } from 'express'
import validateRequest from '../../middlewares/validetRequest'

import { OfferedCourseControllers } from './offeredCourse.controller'
import { OfferedCourseValidations } from './offeredCourse.vadidation'

const router = Router()
router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

export const OfferedCourseRoutes = router
