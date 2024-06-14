const axios = require("axios")

const { Notice } = require("../models/notice")
const { User } = require("../models/user")
const { Types } = require("mongoose")
const moment = require("moment")
const cloudinary = require("cloudinary").v2
require("dotenv").config()

const {
  ctrlWrapper,
  HttpError,
  objForSearch,
  transformNotice,
  transformMinifiedNotice,
  transformNoticeExtended,
  extractPublicId,
} = require("../helpers")
const { noticeCategories } = require("../constants")

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  API_NEWS_URL,
  API_NEWS_KEY,
} = process.env
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

//get all and get for params
const getAll = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category = "sell",
    sex = "",
    dateone = "false",
    datetwo = "false",
    datethree = "false",
    query = "",
  } = req.query

  const date = { dateone, datetwo, datethree }
  const findObject = objForSearch({ category, sex, date, query })
  console.log(findObject)
  const sort = { createdAt: -1 }
  const skip = (page - 1) * limit

  const totalResult = await Notice.countDocuments(findObject)
  const pages = Math.ceil(totalResult / limit)

  const result = await Notice.find(findObject)
    .sort(sort)
    .skip(skip)
    .limit(limit)

  res.json({
    pages,
    notices: result.map(transformMinifiedNotice),
  })
}

const getMyPets = async (req, res) => {
  // Відмінив пакгінацію тому що не встигну зробити
  const user = await req.user.populate("ownPets")
  res.json({
    notices: user.ownPets.map(transformNotice),
  })
}

const getFavoriteAds = async (req, res) => {
  const {
    page = 1,
    limit = 12,
    sex = "",
    dateone = "false",
    datetwo = "false",
    datethree = "false",
    query = "",
  } = req.query

  const date = { dateone, datetwo, datethree }
  const findObject = objForSearch({ sex, date, query })
  const sort = { "favorites._id": -1 }
  const skip = (page - 1) * limit

  const totalResult = req.user.favorites.length
  const pages = Math.ceil(totalResult / limit)

  const { favorites } = await req.user.populate({
    path: "favorites",
    match: findObject,
    options: { sort, skip, limit },
  })

  res.json({
    pages,
    notices: favorites.map(transformMinifiedNotice),
  })
}

const getMyAds = async (req, res) => {
  const { _id: owner } = req.user
  const {
    page = 1,
    limit = 12,
    sex = "",
    dateone = "false",
    datetwo = "false",
    datethree = "false",
    query = "",
  } = req.query

  const date = { dateone, datetwo, datethree }
  const findObject = objForSearch({ sex, date, query })
  const sort = { createdAt: -1 }
  const skip = (page - 1) * limit

  const totalResult = await Notice.countDocuments({ ...findObject, owner })
  const pages = Math.ceil(totalResult / limit)

  const result = await Notice.find({ ...findObject, owner })
    .sort(sort)
    .skip(skip)
    .limit(limit)

  res.json({
    pages,
    notices: result.map(transformNotice),
  })
}

const getById = async (req, res) => {
  const { noticeId } = req.params
  const result = await Notice.findById(noticeId).populate("owner")
  if (!result) {
    throw HttpError(404, "Notice not found")
  }
  res.json({ notice: transformNoticeExtended(result) })
}

const add = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Missed required avatar form-data field")
  }
  const { _id: owner } = req.user
  const { path: file } = req.file
  const result = await Notice.create({
    ...req.body,
    date: moment(req.body.date),
    file,
    owner,
  })
  if (result.category === noticeCategories.MYPET) {
    await User.findByIdAndUpdate(owner, { $push: { ownPets: result._id } })
  }
  res.status(201).json({ notice: transformNotice(result) })
}

const deleteById = async (req, res) => {
  const { noticeId } = req.params
  const notice = await Notice.findById(noticeId)
  if (!notice) {
    throw HttpError(404, "Not found")
  }
  // Якщо власник notice не той що видаляє
  if (notice.owner.toString() !== req.user._id.toString()) {
    throw HttpError(403, "Notice owner is not you")
  }

  // Видаляє зображення із cloudinary
  const publicId = extractPublicId(notice.file)
  const cloudResp = await cloudinary.uploader.destroy(`pets/${publicId}`)
  if (!cloudResp.result || cloudResp.result === "not found") {
    throw HttpError(500, "Image service error")
  }

  // Видаляє Pet із favorites
  await User.updateMany(
    { favorites: notice._id },
    { $pull: { favorites: notice._id } }
  )

  // Лише якщо це категорія MYPET тоді видаляємо
  // використуючи notice.owner , це ефективніше
  if (notice.category === noticeCategories.MYPET) {
    await User.findByIdAndUpdate(notice.owner, {
      $pull: { ownPets: notice._id },
    })
  }

  const deletedNotice = await Notice.findByIdAndRemove(noticeId)
  res.json({ notice: transformNotice(deletedNotice) })
}

const toggleNoticeFavorite = async (req, res) => {
  const { _id, favorites } = req.user
  const { noticeId } = req.params
  const notice = await Notice.findById(noticeId)
  if (!notice) {
    throw HttpError(404, "Notice not found")
  }
  const isInFavorites = favorites.some(itemId => noticeId === itemId.toString())
  const action = isInFavorites ? "$pull" : "$push"
  const newUser = await User.findByIdAndUpdate(
    _id,
    {
      [action]: { favorites: new Types.ObjectId(noticeId) },
    },
    { new: true }
  )
  res.json({
    message: isInFavorites
      ? "Deleted from favorites successfully"
      : "Added to favorites successfully",
  })
}

const getNews = async (req, res) => {
  const fetchNews = async (searchNews, page, perPage) => {
    const searchParams = new URLSearchParams({
      action: "getArticles",
      keyword: searchNews,
      articlesPage: page,
      articlesCount: perPage,
      articlesSortBy: "date",
      articlesSortByAsc: false,
      articlesArticleBodyLen: 1000,
      resultType: "articles",
      dataType: ["news"],
      lang: "eng",
      apiKey: API_NEWS_KEY,
    })

    const data = await axios.get(`${API_NEWS_URL}?${searchParams}`)
    return data
  }

  const { searchNews, page, perPage } = req.query
  const data = await fetchNews(searchNews, page, perPage)
  return data
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getMyPets: ctrlWrapper(getMyPets),
  getFavoriteAds: ctrlWrapper(getFavoriteAds),
  getMyAds: ctrlWrapper(getMyAds),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  toggleNoticeFavorite: ctrlWrapper(toggleNoticeFavorite),
  getNews: ctrlWrapper(getNews),
}
