import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: { type: 'string', required: true },
  academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
})

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  })
  if (isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `${this.name} already exists`)
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, `this ${query} dose not  exists`)
  }
  next()
})
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
