import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty()
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
  MiddleName: z.string().optional(),
  lastName: z.string().nonempty(),
})

// Define Zod schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty(),
  fatherOccupation: z.string().nonempty(),
  fatherContactNumber: z.string().nonempty(),
  motherName: z.string().nonempty(),
  motherOccupation: z.string().nonempty(),
  motherContactNumber: z.string().nonempty(),
})

// Define Zod schema for LocalGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty(),
  occupation: z.string().nonempty(),
  contactNo: z.string().nonempty(),
  address: z.string().nonempty(),
})

// Define Zod schema for Student
const createStudentValidationSchemaZod = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNumber: z.string().nonempty(),
      emergencyContactNumber: z.string().nonempty(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().nonempty(),
      permanentAddress: z.string().optional(),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImage: z.string().optional(),
    }),
  }),
})
export const StudentValidations = {
  studentValidationSchemaZod: createStudentValidationSchemaZod,
}
