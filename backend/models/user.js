const { Schema, model } = require("mongoose")

const Joi = require("joi")

const { handleMongooseError } = require("../helpers")
const {
  dateRegex,
  emailRegex,
  pswRegex,
  phoneRegex,
  cityRegex,
} = require("../constants")

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Set name"],
    },
    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      minlength: 6,
      match: pswRegex,
      required: [true, "Set password for user"],
    },
    city: {
      type: String,
      match: cityRegex,
      default: "",
    },
    phone: {
      type: String,
      match: phoneRegex,
      default: "",
    },
    birthday: {
      type: String,
      match: dateRegex,
      default: "",
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "notice" }],
    ownPets: [{ type: Schema.Types.ObjectId, ref: "notice" }],
    avatar: { type: String },
    token: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less than 2 symbols.",
    "string.max": "The name must be not greater than 16 symbols.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern.base":
      "The email must consist of at least 1 letter at start, then @, then at least 1 letter, then a dot, at the end 2-3 letters.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().pattern(pswRegex).min(6).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.pattern.base":
      "The password must consist of at least one UpperCase, one LowerCase, and one digit from 6 to 16 symbols.",
    "string.min": "The password must be not less than 6 symbols.",
    "string.max": "The password must be not greater than 16 symbols.",
    "any.required": "The password field is required.",
  }),
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern.base":
      "The email must consist of at least 1 letter at start, then @, then at least 1 letter, then a dot, at the end 2-3 letters.",
    "any.required": "The email field is required.",
  }),
})

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern.base":
      "The email must consist of at least 1 letter at start, then @, then at least 1 letter, then a dot, at the end 2-3 letters.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be not less than 6 symbols.",
    "string.max": "The password must be not greater than 16 symbols.",
    "any.required": "The password field is required.",
  }),
})

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less than 2 symbols.",
    "string.max": "The name must be not greater than 16 symbols.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern.base":
      "The email must consist of at least 1 letter at start, then @, then at least 1 letter, then a dot, at the end 2-3 letters.",
    "any.required": "The email field is required.",
  }),
  phone: Joi.string().pattern(phoneRegex).messages({
    "string.base": "The phone must be a string.",
    "string.pattern.base": "The phone must be in format +380XXXXXXXXX.",
  }),
  birthday: Joi.string().pattern(dateRegex).messages({
    "string.base": "The birthday must be a string.",
    "string.pattern.base": "The birthday phone must be in format DD.MM.YYYY.",
  }),
  city: Joi.string().min(2).pattern(cityRegex).messages({
    "string.base": "The city must be a string.",
    "string.min": "The city must be not less than 2 symbols.",
    "string.pattern.base":
      "The city must consist of only letters, no numbers and no spaces and have at least 2 symbols.",
  }),
})

const schemas = {
  registerSchema,
  loginSchema,
  updateSchema,
  emailSchema,
}

const User = model("user", userSchema)

module.exports = { User, schemas }
