import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'
import sendResponse from '../../utils/sendResponse'
import statusCode from 'http-status'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body
    // const zodParseData = studentValidationSchemaZod.parse(studentData)

    const result = await UserServices.createStudentIntoDb(password, studentData)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserControllers = {
  createStudent,
}
