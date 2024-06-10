import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { OfferedCourseService } from './offeredCourse.service'

const createOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course  is  created successfully',
    data: result,
  })
})
const updateOfferedCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseService.updateOfferedCourseIntoDB(
    id,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered Course  is  Update  successfully',
    data: result,
  })
})

export const OfferedCourseControllers = {
  createOfferedCourse,
  updateOfferedCourse,
}
