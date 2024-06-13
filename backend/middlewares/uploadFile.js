const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const { nanoid } = require("nanoid")
require("dotenv").config()

const { imageFileLimit } = require("../constants")
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env

/**
 * Файли будуть завантажені одразу після отримання мультером
 */

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder
    switch (file.fieldname) {
      case "avatar":
        public_id = req.user._id
        folder = "avatars"
        break
      case "file":
        public_id = nanoid()
        folder = "pets"
        break
      default:
        throw newError("Only file and avatars fields exist")
    }

    return {
      folder,
      allowed_formats: ["jpg", "png"],
      public_id,
      // transformation: [{ width: 350, height: 350 }],
    }
  },
})

const multerFilter = (_, file, callback) => {
  if (file.mimetype.includes("image/")) {
    callback(null, true)
  } else {
    callback(HttpError(400, "Please, upload images only!"), false)
  }
}

const uploadFile = multer({
  storage,
  fileFilter: multerFilter,
  limits: {
    fileSize: imageFileLimit,
  },
})

module.exports = uploadFile
