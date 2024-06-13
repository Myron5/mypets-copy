const extractPublicId = url => {
  const urlArr = url.split("/")
  const img = urlArr[urlArr.length - 1]
  const [result] = img.split(".")
  return result
}

module.exports = extractPublicId
