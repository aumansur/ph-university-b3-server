/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'

const globalErrorHandlers = (
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = error.statusCode || 500
  const message = error.message || 'something went wrong'
  return res.status(statusCode).json({
    success: false,
    message: message,
    error: message,
  })
}
export default globalErrorHandlers
