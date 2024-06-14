const express = require("express")
const ctrl = require("../../controllers/notices")
const { schemas } = require("../../models/notice")
const {
  validateBody,
  isValidId,
  authenticate,
  uploadFile,
  validateParams,
} = require("../../middlewares")

const router = express.Router()

router.get("/", validateParams(schemas.paramsNoticeSchema), ctrl.getAll)

router.get("/mypets", authenticate, ctrl.getMyPets)

router.get("/news", ctrl.getNews)

router.get(
  "/favoriteads",
  authenticate,
  validateParams(schemas.paramsNoticeSecondSchema),
  ctrl.getFavoriteAds
)

router.get(
  "/myads",
  authenticate,
  validateParams(schemas.paramsNoticeSecondSchema),
  ctrl.getMyAds
)

router.get("/:noticeId", isValidId, ctrl.getById)

router.post(
  "/",
  authenticate,
  uploadFile.single("file"),
  validateBody(schemas.addNoticeSchema),
  ctrl.add
)

router.delete("/:noticeId", authenticate, isValidId, ctrl.deleteById)

router.post(
  "/:noticeId/favorite",
  authenticate,
  isValidId,
  ctrl.toggleNoticeFavorite
)

module.exports = router
