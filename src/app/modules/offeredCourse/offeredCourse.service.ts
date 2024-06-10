import httpStatus from 'http-status'
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model'
import { TOfferedCourse } from './offeredCourse.interface'
import { OfferedCourse } from './offeredCourse.model'
import AppError from '../../errors/AppError'
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { Course } from '../course/course.model'
import { Faculty } from '../faculty/faculty.model'
import { hasTimeConflict } from './offeredCourse.utils'

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload
  // check if the semester registration id is exists
  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration)
  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found!')
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester
  const isAcademicFacultiesExists =
    await AcademicFaculty.findById(academicFaculty)
  if (!isAcademicFacultiesExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic faculty is not found!',
    )
  }
  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment)
  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Department is not found!',
    )
  }
  const isCourseExists = await Course.findById(course)
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Course is not found!')
  }
  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This faculty is not found!')
  }

  // check if the department is belong to the faculty
  // check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  })

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExists.name} is not  belong to this ${isAcademicFacultiesExists.name}`,
    )
  }

  // if check if the offered course same section in same register semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    })
  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Offered course with same section is already exists !`,
    )
  }

  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')
  // console.log(assignSchedules)

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at the time ! choose other time or day`,
    )
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester })
  return result
}

// update

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload
  const isOfferedCourseExists = await OfferedCourse.findById(id)
  if (!isOfferedCourseExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This offered course is not found!',
    )
  }
  const isFacultyExists = await Faculty.findById(faculty)
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty  is not found!')
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration)
  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Yoy cannot update this offered course as it is ${semesterRegistrationStatus?.status}`,
    )
  }
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime')
  // console.log(assignSchedules)

  const newSchedule = {
    days,
    startTime,
    endTime,
  }

  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This faculty is not available at the time ! choose other time or day`,
    )
  }

  const result = await OfferedCourse.findByIdAndUpdate(
    id,
    payload,

    { new: true },
  )
  return result
}

export const OfferedCourseService = {
  createCourseIntoDB: createOfferedCourseIntoDB,
  updateOfferedCourseIntoDB,
}
