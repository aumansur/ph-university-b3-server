import { Schema, model } from 'mongoose'
import {
  TCourse,
  TCourseFaculties,
  TPrerequisiteCourse,
} from './course.interface'

const preRequisiteCoursesSchema = new Schema<TPrerequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})
const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    required: true,
    trim: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDelete: {
    type: Boolean,
    default: false,
  },
})

export const Course = model<TCourse>('Course', courseSchema)

// ==========
const courseFacultySchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      unique: true,
    },
  ],
})
export const CourseFaculty = model<TCourseFaculties>(
  'CourseFaculty',
  courseFacultySchema,
)
