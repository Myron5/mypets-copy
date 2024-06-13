const preparePutData = putData => {
  const { name, email, phone, birthday, city } = putData;
  const newPutData = { name, email };
  if (phone) {
    newPutData.phone = putData.phone;
  }
  if (birthday) {
    newPutData.birthday = putData.birthday;
  }
  if (city) {
    newPutData.city = putData.city;
  }
  return newPutData;
};

export default preparePutData;
