const moment = require("moment")

const format = dateStr => {
  return moment(new Date(dateStr)).format("DD.MM.yyyy")
}

const calcAge = dateStr => {
  const years = moment().diff(dateStr, "years")
  const months = moment().diff(dateStr, "months")
  const days = moment().diff(dateStr, "days")

  if (years === 0 && months === 0 && days === 0) {
    return "today"
  }

  if (years !== 0) {
    return years === 1 ? "1 year" : `${years} years`
  }
  if (months !== 0) {
    return months === 1 ? "1 month" : `${months} months`
  }
  if (days !== 0) {
    return days === 1 ? "1 day" : `${days} days`
  }

  return null
}

const transformMinifiedNotice = obj => {
  const result = {
    id: obj._id,
    category: obj.category,
    file: obj.file,
    owner: obj.owner,
  }
  if (obj.title) {
    result.title = obj.title
  }
  if (obj.date) {
    result.age = calcAge(obj.date)
  }
  if (obj.sex) {
    result.sex = obj.sex
  }
  if (obj.location) {
    result.location = obj.location
  }
  return result
}

const transformNotice = obj => {
  const result = {
    id: obj._id,
    category: obj.category,
    name: obj.name,
    type: obj.type,
    file: obj.file,
    comments: obj.comments,
    owner: obj.owner,
  }
  if (obj.title) {
    result.title = obj.title
  }
  if (obj.date) {
    result.date = format(obj.date)
    result.age = calcAge(obj.date)
  }
  if (obj.sex) {
    result.sex = obj.sex
  }
  if (obj.location) {
    result.location = obj.location
  }
  if (obj.price) {
    result.price = obj.price
  }
  return result
}

const transformUser = obj => {
  return {
    id: obj._id,
    name: obj.name,
    email: obj.email,
    city: obj.city,
    phone: obj.phone,
    birthday: obj.birthday,
    avatar: obj.avatar,
    favorites: obj.favorites,
  }
}

const transformNoticeExtended = obj => {
  return { ...transformNotice(obj), owner: transformUser(obj.owner) }
}

module.exports = {
  transformMinifiedNotice,
  transformNotice,
  transformNoticeExtended,
  transformUser,
}
