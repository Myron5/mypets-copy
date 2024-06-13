const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { nanoid } = require("nanoid")
require("dotenv").config()

const { User } = require("../models/user.js")
const {
  ctrlWrapper,
  HttpError,
  sendEmail,
  transformUser,
  getEnv,
  format,
} = require("../helpers")

const { SECRET_KEY } = process.env
const { BASE_URL_FRONTEND } = getEnv()

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw HttpError(409, "Email already in use")
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const verificationToken = nanoid()
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
    verify: false,
  })
  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL_FRONTEND}/afterverify/${verificationToken}">HELLO my friend, Click for verify your email</a>`,
  }
  await sendEmail(verifyEmail)
  res.status(201).json({ message: "Email was sent successfully" })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(401, "Email or password is wrong")
  } else if (!user.verify) {
    throw HttpError(401, "Email not verified")
  }
  const passwordCompare = await bcrypt.compare(password, user.password)
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong")
  }
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, { token })
  res.json({ token, user: transformUser(user) })
}

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    HttpError(404, "User not found")
  } else if (!user.verificationToken) {
    HttpError(404)
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
    token,
  })

  res.json({ token, user: transformUser(user) })
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    throw HttpError(404, "User not found")
  } else if (user.verify) {
    throw HttpError(401, "Verification has already been passed")
  }
  const verifyEmail = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL_FRONTEND}/afterverify/${user.verificationToken}">Click verify email</a>`,
  }
  await sendEmail(verifyEmail)
  res.json({ message: "Verify email send success" })
}

const logout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: "" })
  res.status(204).json({ message: "Logout success" })
}

const getCurrent = async (req, res) => {
  res.json({ token: req.user.token, user: transformUser(req.user) })
}

const getUserIdFromToken = authorizationHeader => {
  const token = authorizationHeader.split(" ")[1]
  const decodedToken = jwt.verify(token, SECRET_KEY)
  return decodedToken.id
}

const refreshToken = async (req, res) => {
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    throw HttpError(401, "Authorization header missing")
  }
  const userId = getUserIdFromToken(authorizationHeader)
  const user = await User.findOne({ _id: userId })
  if (!user) {
    throw HttpError(401, "Invalid token")
  }
  try {
    const payload = { id: user._id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  } catch (error) {
    if (error.message === "jwt expired") {
      throw HttpError(400, "Invalid Token")
    }
    throw HttpError(500, "Server error")
  }
  await User.findByIdAndUpdate(user._id, { token })
  res.json({ token, user: transformUser(user) })
}

const updateUser = async (req, res) => {
  const { _id } = req.user
  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  })
  res.json({ user: transformUser(user) })
}

const updateAvatar = async (req, res) => {
  const { _id } = req.user
  if (!req.file) {
    throw HttpError(400, "Image field required")
  }
  const { path: avatar } = req.file
  const result = await User.findByIdAndUpdate(
    _id,
    { avatar },
    {
      new: true,
    }
  )
  res.json({ avatar })
}

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
}
