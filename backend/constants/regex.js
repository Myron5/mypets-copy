const dateRegex = /^\d{2}.\d{2}.\d{4}$/

const onlyLettersRegex = /^[a-zA-Z ]+$/

const cityRegex = /^[a-zA-Z]+$/

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,16})/

const phoneRegex = /^\+\d{11,12}$/

module.exports = {
  dateRegex,
  onlyLettersRegex,
  cityRegex,
  emailRegex,
  pswRegex,
  phoneRegex,
}
