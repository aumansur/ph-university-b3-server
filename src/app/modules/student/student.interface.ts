import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNumber: string
  motherName: string
  motherOccupation: string
  motherContactNumber: string
}
export type TUserName = {
  firstName: string
  MiddleName?: string
  lastName: string
}
export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}
export type TStudent = {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth?: Date
  contactNumber: string
  emergencyContactNumber: string
  email: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string

  permanentAddress?: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  admissionSemester: Types.ObjectId
}

// for creating static methods
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}

// for creating instance

// export type StudentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, {}, StudentMethod>
