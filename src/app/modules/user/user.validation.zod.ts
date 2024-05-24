import { z } from 'zod'

const userSchemaValidationZod = z.object({
  password: z
    .string({ invalid_type_error: 'password must be string' })
    .max(20, { message: 'password cannot be more than 20 characters' })
    .optional(),
})

export const UserValidation = {
  userSchemaValidationZod,
}
