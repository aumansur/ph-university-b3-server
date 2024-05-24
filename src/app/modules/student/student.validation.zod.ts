import { z } from 'zod'

const userNameSchema = z.object({
  firstName: z
    .string()
    .nonempty()
    .regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
  MiddleName: z.string().optional(),
  lastName: z.string().nonempty(),
})

// Define Zod schema for Guardian
const guardianSchema = z.object({
  fatherName: z.string().nonempty(),
  fatherOccupation: z.string().nonempty(),
  fatherContactNumber: z.string().nonempty(),
  motherName: z.string().nonempty(),
  motherOccupation: z.string().nonempty(),
  motherContactNumber: z.string().nonempty(),
})

// Define Zod schema for LocalGuardian
const localGuardianSchema = z.object({
  name: z.string().nonempty(),
  occupation: z.string().nonempty(),
  contactNo: z.string().nonempty(),
  address: z.string().nonempty(),
})

// Define Zod schema for Student
const studentValidationSchemaZod = z.object({
  id: z.string().nonempty(),
  password: z.string().max(20),
  name: userNameSchema,
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
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'block']).default('active'),
  isDeleted: z.boolean(),
})

export default studentValidationSchemaZod
