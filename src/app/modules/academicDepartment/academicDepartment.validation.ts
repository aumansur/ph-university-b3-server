import { z } from 'zod'

const createAcademicDepartmentSchemaValidationZod = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be string',
      required_error: ' name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'academicFaculty must be string',
      required_error: 'academicFaculty in required ',
    }),
  }),
})
const updateAcademicDepartmentSchemaValidationZod = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name must be string',
        required_error: ' name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'academicFaculty must be string',
        required_error: 'academicFaculty in required ',
      })
      .optional(),
  }),
})
export const DepartmentValidation = {
  createAcademicDepartmentSchemaValidationZod,
  updateAcademicDepartmentSchemaValidationZod,
}
