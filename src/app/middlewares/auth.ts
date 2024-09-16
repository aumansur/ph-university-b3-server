import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync'
import AppError from '../errors/AppError'
import httpStatus from 'http-status'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // if everything all is well next () ->
    const token = req.headers.authorization
    console.log(token)
    // if the check token from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, ' you are not unauthorized')
    }
    // check if the valid token
    let decoded
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }

    const { role, userId, iat } = decoded

    const user = await User.isUserExistsByCustomId(userId)
    console.log(user)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user does not found!')
    }
    // checking if user is already  deleted
    const isDeleted = user?.isDeleted

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!')
    }
    //   console.log(payload)

    // checking if user is already  deleted
    const userStatus = user?.status

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is Blocked!')
    }

    if (
      user.passwordChangeAt &&
      (await User.isJwtIssuedBeforePasswordChanged(
        user.passwordChangeAt,
        iat as number,
      ))
    ) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized  ')
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, ' you are not unauthorized')
    }
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
