const noticeCategories = require("./noticeCategories")
const noticeSexes = require("./noticeSexes")
const {
  dateRegex,
  onlyLettersRegex,
  cityRegex,
  emailRegex,
  pswRegex,
  phoneRegex,
} = require("./regex")

module.exports = {
  noticeCategories,
  noticeSexes,
  dateRegex,
  onlyLettersRegex,
  cityRegex,
  emailRegex,
  pswRegex,
  phoneRegex,
  imageFileLimit: 3 * 1024 * 1024,
}
