import { RequestHandler } from 'express'
import { StudentServices } from './student.service'
import statusCode from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Student are retrieved successfully',
    data: result,
  })
})

const getSingleStudents = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.getSingleStudentsFromDB(studentId)

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Single Student are retrieved successfully',
    data: result,
  })
})

// deleted data
const deleteStudents: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params
  const result = await StudentServices.deleteStudentsFromDB(studentId)

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'student deleted  successfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
}
