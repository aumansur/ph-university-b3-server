import jwt from 'jsonwebtoken'

export const createToken = (
  jewPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jewPayload, secret, {
    expiresIn,
  })
}
