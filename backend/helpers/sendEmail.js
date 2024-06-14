const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

const sendEmail = async data => {
  const options = { ...data, from: process.env.EMAIL_FROM }
  await transporter.sendMail({ ...options })
  return true
}

module.exports = sendEmail
