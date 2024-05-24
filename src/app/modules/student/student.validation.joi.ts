import Joi from 'joi'

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.pattern.base':
        '{#label} should contain only alphabetic characters.',
      'any.required': '{#label} is required.',
    }),
  middleName: Joi.string().allow(null, ''),
  lastName: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
})

const guardianSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  fatherContactNumber: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  motherName: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  motherContactNumber: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
})

const localGuardianSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  occupation: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  address: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
})

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  name: userNameSchema.required().messages({
    'any.required': '{#label} is required.',
  }),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.required': '{#label} is required.',
    'any.only': '{#label} must be either male or female.',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': '{#label} must be a valid email address.',
    'any.required': '{#label} is required.',
  }),
  contactNumber: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().required().messages({
    'any.required': '{#label} is required.',
  }),
  permanentAddress: Joi.string().optional(),
  guardian: guardianSchema.required().messages({
    'any.required': '{#label} is required.',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': '{#label} is required.',
  }),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'block').default('active').messages({
    'any.only': '{#label} must be either active or block.',
  }),
})

export default studentValidationSchema
