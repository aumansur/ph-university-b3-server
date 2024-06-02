import { z } from 'zod'

const createAcademicFacultySchemaValidationZod = z.object({
  body: z.object({
    name: z.string({ invalid_type_error: 'name must be string' }),
  }),
})
const updateAcademicFacultySchemaValidationZod = z.object({
  body: z
    .object({
      name: z.string({ invalid_type_error: 'name must be string' }),
    })
    .optional(),
})

export const FacultyValidation = {
  createAcademicFacultySchemaValidationZod,
  updateAcademicFacultySchemaValidationZod,
}
