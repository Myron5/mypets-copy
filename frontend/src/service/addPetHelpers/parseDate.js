import dayjs from 'dayjs';

const parseDate = obj => {
  if (!obj || !obj.birthday) {
    return obj;
  }

  if (obj.birthday.includes('-')) {
    const birthday = dayjs(obj.birthday, 'YYYY-MM-DD').format('DD.MM.YYYY');
    return { ...obj, birthday };
  }

  const birthday = obj.birthday.split('.').reverse().join('-');
  return { ...obj, birthday };
};

export default parseDate;
