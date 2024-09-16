import nodemailer from 'nodemailer'
import config from '../config'
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'ahammadullah2001@gmail.com',
      pass: 'xfzh aobv bbzm opzx',
    },
  })

  await transporter.sendMail({
    from: 'ahammadullah2001@gmail.com',
    to,
    subject: 'Reset password link from PH University', // Subject line
    text: 'Reset Your password within 10 min ', // plain text body
    html, // html body
  })
}
