const prepareFormData = obj => {
  const result = {
    category: obj.category,
    name: obj.name,
    type: obj.type,
    file: obj.file,
    comments: obj.comments,
  }
  if (obj.title) {
    result.title = obj.title
  }
  if (obj.date) {
    result.date = obj.date  }
  if (obj.sex) {
    result.sex = obj.sex
  }
  if (obj.location) {
    result.location = obj.location
  }
  if (obj.price) {
    result.price = obj.price
  }
  if (obj.comments) {
    result.comments = obj.comments;
  }
  return result
}

export default prepareFormData
