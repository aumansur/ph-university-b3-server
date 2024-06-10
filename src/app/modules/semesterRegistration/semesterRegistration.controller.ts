import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { SemesterRegistrationService } from './semesterRegistration.service'

const createSemesterRegistration: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await SemesterRegistrationService.createSemesterRegistrationIntoDB(
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration create successfully',
      data: result,
    })
  },
)
const getAllSemesterRegistrations: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await SemesterRegistrationService.getAllSemesterRegistrationFromDB(
        req.query,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester registration retrieved successfully',
      data: result,
    })
  },
)
const getSingleSemesterRegistrations: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result =
      await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single Semester registration retrieved successfully',
      data: result,
    })
  },
)
const updateSemesterRegistrations: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result =
      await SemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      )

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'updated Semester registration  successfully',
      data: result,
    })
  },
)

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistrations,
  updateSemesterRegistrations,
}
