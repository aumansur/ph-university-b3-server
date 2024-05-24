import e, { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'
import statusCode from 'http-status'
import sendResponse from '../../utils/sendResponse'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Student are retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentsFromDB(studentId)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Single Student are retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// deleted data
const deleteStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteStudentsFromDB(studentId)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'student deleted  successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudents,
}
