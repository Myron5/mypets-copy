const today = new Date()

const threeMonthAgo = new Date(
  today.getFullYear(),
  today.getMonth() - 3,
  today.getDate()
)

const yearAgo = new Date(
  today.getFullYear() - 1,
  today.getMonth(),
  today.getDate()
)

const twoYearsAgo = new Date(
  today.getFullYear() - 2,
  today.getMonth(),
  today.getDate()
)

const addToOr = (newObj, addOption) => {
  const [key] = Object.keys(addOption)

  if (!newObj["$or"]) {
    newObj["$or"] = []
    newObj["$or"].push(addOption)
    return
  }

  if (newObj["$or"]["length"] !== 0 && newObj["$or"][0][key]) {
    const prev = { [key]: newObj["$or"][0][key] }
    delete newObj["$or"][0][key]

    const copy = newObj["$or"].map(el => ({ ...el, ...prev }))
    const copy_2 = newObj["$or"].map(el => ({ ...el, ...addOption }))
    newObj["$or"] = [...copy, ...copy_2]
    return
  }

  orKeys = newObj["$or"].map(el => Object.keys(el)[0])
  const hasDuplicates = new Set(orKeys).size !== orKeys.length

  if (hasDuplicates) {
    newObj["$or"] = newObj["$or"].map(el => ({ ...el, ...addOption }))
    return
  }

  newObj["$or"].push(addOption)
}

const filterAge = (obj, newObj) => {
  const toBoolean = ({ dateone, datetwo, datethree }) => {
    const copyDateone = dateone === "false" ? false : true
    const copyDatetwo = datetwo === "false" ? false : true
    const copyDatethree = datethree === "false" ? false : true

    return {
      dateone: copyDateone,
      datetwo: copyDatetwo,
      datethree: copyDatethree,
    }
  }

  const { dateone, datetwo, datethree } = toBoolean(obj.date)

  if (!dateone && !datetwo && !datethree) return
  else if (dateone && datetwo && datethree)
    newObj.date = { $gt: new Date(0), $lte: threeMonthAgo }

  if (!dateone && datetwo && datethree) {
    newObj.date = { $gt: new Date(0), $lte: threeMonthAgo }
  } else if (dateone && !datetwo && datethree) {
    addToOr(newObj, { date: { $gt: yearAgo, $lte: threeMonthAgo } })
    addToOr(newObj, { date: { $gt: new Date(0), $lte: twoYearsAgo } })
  } else if (dateone && datetwo && !datethree) {
    newObj.date = { $gt: twoYearsAgo, $lte: threeMonthAgo }
  }

  if (dateone && !datetwo && !datethree) {
    newObj.date = { $gt: yearAgo, $lte: threeMonthAgo }
  } else if (!dateone && datetwo && !datethree) {
    newObj.date = { $gt: twoYearsAgo, $lte: yearAgo }
  } else if (!dateone && !datetwo && datethree) {
    newObj.date = { $gt: new Date(), $lte: twoYearsAgo }
  }
}

const filterByKeyword = (obj, newObj) => {
  const keyword = obj.query

  addToOr(newObj, { title: { $regex: keyword, $options: "i" } })
  addToOr(newObj, { name: { $regex: keyword, $options: "i" } })
  addToOr(newObj, { type: { $regex: keyword, $options: "i" } })
}

const objForSearch = obj => {
  const newObj = {}
  for (const key in obj) {
    if (obj[key]) {
      switch (key) {
        case "query":
          filterByKeyword(obj, newObj)
          break
        case "date":
          filterAge(obj, newObj)
          break
        default:
          newObj[key] = obj[key]
      }
    }
  }
  return newObj
}

module.exports = objForSearch
