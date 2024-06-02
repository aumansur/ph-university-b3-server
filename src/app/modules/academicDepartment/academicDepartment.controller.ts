import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import statusCode from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Academic Department is  created successfully',
      data: result,
    })
  },
)
const getAllAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Academic Department are retrieved successfully',
      data: result,
    })
  },
)
const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { facultyId: departmentId } = req.params
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(
        departmentId,
      )

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'single Academic Department are retrieved successfully',
      data: result,
    })
  },
)
const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params

    const result =
      await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
        departmentId,
        req.body,
      )

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'Academic Department is Update successfully',
      data: result,
    })
  },
)

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
