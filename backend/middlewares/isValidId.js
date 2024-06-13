const { isValidObjectId } = require("mongoose")

const { HttpError } = require("../helpers")

const isValidId = (req, res, next) => {
  const { noticeId } = req.params

  if (!isValidObjectId(noticeId)) {
    next(HttpError(400, `${noticeId} is not valid id`))
  }

  next()
}

module.exports = isValidId
