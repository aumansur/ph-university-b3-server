import config from '../../config'

import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import generateStudentId from './user.utils'
// import { generateStudentId } from './user.utils'

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  userData.password = password || (config.default_pass as string)

  // set student role
  userData.role = 'student'
  // userData.id = '2030100001'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  if (!admissionSemester) {
    throw new Error('Admission semester not found')
  } else {
    userData.id = await generateStudentId(admissionSemester)
  }

  // set manually generated id

  // create a user
  const newUser = await User.create(userData) // create build in static method

  // create a student
  if (Object.keys(newUser).length) {
    // set id _id as user
    payload.id = newUser.id
    payload.user = newUser._id
    const newStudent = await Student.create(payload)
    return newStudent // create build in static method
  }
}

export const UserServices = {
  createStudentIntoDb,
}
