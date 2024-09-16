import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface TUser {
  id: string
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  // myStaticMethod(): number
  isUserExistsByCustomId(id: string): Promise<TUser>
  isPasswordMatched(
    plainPassword: string,
    hashingPassword: string,
  ): Promise<boolean>
  isJwtIssuedBeforePasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE
