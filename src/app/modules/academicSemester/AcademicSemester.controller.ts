import { RequestHandler } from 'express'

import statusCode from 'http-status'
import catchAsync from '../../utils/catchAsync'

import { AcademicSemesterServices } from './academicSemester.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

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
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB(
    req.query,
  )
  console.log(result)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    meta: result.meta,
    data: result.result,
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
