import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'
import config from '../../config'

import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      required: true,
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
)
// set '' after saving password
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the d-ata')
  // hashing password and save into DB
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})
// post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = ''
  // console.log(this, 'post hook: we  save our data')
  next()
})

export const User = model<TUser>('User', userSchema)
