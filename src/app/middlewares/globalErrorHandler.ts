import { NextFunction, Request, Response } from 'express'

const globalErrorHandlers = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500
  const message = 'something went wrong'
  return res.status(statusCode).json({
    success: false,
    message: message,
    error: error,
  })
}
export default globalErrorHandlers
