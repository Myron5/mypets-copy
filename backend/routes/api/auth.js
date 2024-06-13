const express = require("express")
const ctrl = require("../../controllers/auth")
const { validateBody, authenticate, uploadFile } = require("../../middlewares")
const { schemas } = require("../../models/user")

const router = express.Router()

router.post("/register", validateBody(schemas.registerSchema), ctrl.register)

router.get("/verify/:verificationToken", ctrl.verifyEmail)

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login)

router.post("/logout", authenticate, ctrl.logout)

router.get("/current", authenticate, ctrl.getCurrent)

router.put(
  "/",
  authenticate,
  validateBody(schemas.updateSchema),
  ctrl.updateUser
)

router.put(
  "/avatar",
  authenticate,
  uploadFile.single("avatar"),
  ctrl.updateAvatar
)

module.exports = router
