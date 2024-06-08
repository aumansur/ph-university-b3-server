import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import { CourseServices } from './course.service'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course  is  created successfully',
    data: result,
  })
})
const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses are retrieved successfully',
    data: result,
  })
})
const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single course are retrieved successfully',
    data: result,
  })
})
const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.updateCourseIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is Update successfully',
    data: result,
  })
})
const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CourseServices.deletedCourseFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  })
})

const assignFacultiesWithCourse: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params
    const { faculties } = req.body
    const result = await CourseServices.assignFacultiesWithCourseIntoDB(
      courseId,
      faculties,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculties assign successfully',
      data: result,
    })
  },
)

const removeFacultiesFromCourse: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params
    const { faculties } = req.body
    const result = await CourseServices.removeFacultiesFromCourseFromDB(
      courseId,
      faculties,
    )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculties remove successfully',
      data: result,
    })
  },
)
export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
}
