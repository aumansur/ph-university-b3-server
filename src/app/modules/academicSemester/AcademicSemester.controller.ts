import { RequestHandler } from 'express'

import sendResponse from '../../utils/sendResponse'
import statusCode from 'http-status'
import catchAsync from '../../utils/catchAsync'

import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic semester is  created successfully',
    data: result,
  })
})
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  })
})
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const { semesterId } = req.params
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId)

    sendResponse(res, {
      statusCode: statusCode.OK,
      success: true,
      message: 'single Academic semesters are retrieved successfully',
      data: result,
    })
  },
)
const updateAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  )

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: 'Academic semester is Update successfully',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
