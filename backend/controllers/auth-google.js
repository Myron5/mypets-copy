const axios = require("axios")
const { nanoid } = require("nanoid")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const { User } = require("../models/user.js")
const { ctrlWrapper, getEnv } = require("../helpers")

const { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
const { BASE_URL, BASE_URL_FRONTEND } = getEnv()

const googleAuth = async (req, res) => {
  const stringifiedParams = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  })
  res.json({
    redirectUrl: `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`,
  })
}

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = new URLSearchParams(urlObj.search)
  const code = urlParams.get("code")
  const { data: tokenData } = await axios.post(
    "https://oauth2.googleapis.com/token",
    {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    }
  )
  const { data: userData } = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    }
  )

  let [user = ""] = await User.find({ email: userData.email })
  if (!user) {
    const password = nanoid()
    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({
      name: userData.name,
      email: userData.email,
      password: hashPassword,
      avatar: userData.picture,
    })
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
  await User.findByIdAndUpdate(user._id, { token })

  res.redirect(`${BASE_URL_FRONTEND}/notices/sell?token=${token}`)
}

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
}
