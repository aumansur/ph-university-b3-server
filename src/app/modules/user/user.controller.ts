import { RequestHandler } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import statusCode from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body
  // const zodParseData = studentValidationSchemaZod.parse(studentData)

  const result = await UserServices.createStudentIntoDb(password, studentData)

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
