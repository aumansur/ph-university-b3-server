import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import statusCode from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic faculty is  created successfully',
    data: result,
  })
})
const getAllAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDB()

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic Faculty are retrieved successfully',
    data: result,
  })
})
const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const { facultyId } = req.params
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'single Academic Faculty are retrieved successfully',
      data: result,
    })
  },
)
const updateAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic Faculty is Update successfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
