import { petCategory, noticeCategories } from 'constants/petCategory';

const { SELL, LOSTFOUND, FORFREE, MYPET } = noticeCategories;

const transformCategory = category => {
  switch (category) {
    case MYPET:
      return petCategory[0];
    case SELL:
      return petCategory[1];
    case LOSTFOUND:
      return petCategory[2];
    case FORFREE:
      return petCategory[3];
    default:
      return null;
  }
};

export default transformCategory;
