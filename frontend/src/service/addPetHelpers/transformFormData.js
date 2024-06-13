const {
  petCategory,
  noticeCategories: { LOSTFOUND, FORFREE, MYPET },
} = require('constants/petCategory');

const transformFormData = values => {
  let {
    category,
    title,
    name,
    date,
    sex,
    file,
    location,
    price,
    typePet: type,
    comments,
  } = values;

  switch (category) {
    case petCategory[0]:
      category = MYPET;
      break;
    case petCategory[2]:
      category = LOSTFOUND;
      break;
    case petCategory[3]:
      category = FORFREE;
      break;

    default:
      break;
  }

  date = new Date(values.date).toISOString();

  return {
    category,
    title,
    name,
    date,
    sex,
    file,
    location,
    price,
    type,
    comments,
  };
};

export default transformFormData;
