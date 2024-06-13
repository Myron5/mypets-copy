const { Schema, model } = require("mongoose")
const Joi = require("joi")

const { handleMongooseError, HttpError, isOneOf } = require("../helpers")
const { User } = require("./user")
const {
  noticeCategories,
  noticeSexes,
  onlyLettersRegex,
  cityRegex,
} = require("../constants")
const { SELL, LOSTFOUND, FORFREE, MYPET } = noticeCategories

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: Object.values(noticeCategories),
      required: [true, "Set a category for the pet"],
    },
    title: {
      type: String,
      minlength: 4,
      maxlength: 32,
      required: function () {
        const isRequired = isOneOf(this.category, SELL, LOSTFOUND, FORFREE)
        return isRequired
      },
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      match: onlyLettersRegex,
      required: [true, "Set a name for the pet"],
    },
    date: {
      type: Date,
      required: function () {
        const isRequired = isOneOf(this.category, SELL, FORFREE)
        return isRequired
      },
    },
    type: {
      type: String,
      minlength: 2,
      maxlength: 16,
      match: onlyLettersRegex,
      required: [true, "Set a name for the pet"],
    },
    file: {
      type: String,
      required: [true, "Set a photo for the pet"],
    },
    sex: {
      type: String,
      enum: Object.values(noticeSexes),
      required: function () {
        const isRequired = isOneOf(this.category, SELL, LOSTFOUND, FORFREE)
        return isRequired
      },
    },
    location: {
      type: String,
      minlength: 2,
      match: cityRegex,
      required: function () {
        const isRequired = isOneOf(this.category, SELL, LOSTFOUND, FORFREE)
        return isRequired
      },
    },
    price: {
      type: Number,
      min: 1,
      required: function () {
        const isRequired = isOneOf(this.category, SELL)
        return isRequired
      },
    },
    comments: {
      type: String,
      maxlength: 140,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
)

noticeSchema.post("save", handleMongooseError)

/**
 * Схеми Joi (addNoticeSchema)
 */

const addNoticeSchema = Joi.object({
  // *-* category *-*
  category: Joi.string()
    .valid(...Object.values(noticeCategories))
    .required()
    .messages({
      "string.base": "The category must be a string.",
      "any.only":
        "The category must be one of: sell, lost-found, for-free, my-pet",
      "any.required": "The category field is required.",
    }),

  // *-* title *-*
  title: Joi.string()
    .min(4)
    .max(32)
    .when("category", {
      is: Joi.valid(SELL, LOSTFOUND, FORFREE),
      then: Joi.required(),
    })
    .messages({
      "string.base": "The title must be a string.",
      "string.min": "The title must be not less than 4 symbols.",
      "string.max": "The title must be not greater than 32 symbols.",
      "any.required": "The title field is required.",
    }),

  // *-* name *-*
  name: Joi.string().min(2).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be not less than 2 symbols.",
    "string.max": "The name must be not greater than 16 symbols.",
    "any.required": "The name field is required.",
  }),

  // *-* date *-*
  date: Joi.date()
    .max("now")
    .when("category", {
      is: Joi.valid(SELL, FORFREE),
      then: Joi.required(),
    })
    .messages({
      "date.base": "The date must be a date type.",
      "date.max": "The date cannot be in the future.",
      "any.required": "The date field is required.",
    }),

  // *-* type *-*
  type: Joi.string()
    .min(2)
    .max(16)
    .pattern(onlyLettersRegex)
    .required()
    .messages({
      "string.base": "The name must be a string.",
      "string.min": "The type must be not less than 2 symbols.",
      "string.max": "The type must be not greater than 16 symbols.",
      "string.pattern.base":
        "The type must consist of only letters, no numbers.",
      "any.required": "The type field is required.",
    }),

  // *-* sex *-*
  sex: Joi.string()
    .valid(...Object.values(noticeSexes))
    .when("category", {
      is: Joi.valid(SELL, LOSTFOUND, FORFREE),
      then: Joi.required(),
    })
    .messages({
      "string.base": "The sex must be a string.",
      "any.only": "The sex must be one of: male, female",
      "any.required": "The sex field is required.",
    }),

  // *-* location *-*
  location: Joi.string()
    .min(2)
    .pattern(cityRegex)
    .when("category", {
      is: Joi.valid(SELL, LOSTFOUND, FORFREE),
      then: Joi.required(),
    })
    .messages({
      "string.base": "The location must be a string.",
      "string.min": "The location must be not less than 2 symbols.",
      "string.pattern.base":
        "The location must consist of only letters, no numbers and no spaces and have at least 2 symbols.",
      "any.required": "The location field is required.",
    }),

  // *-* price *-*
  price: Joi.number()
    .min(1)
    .when("category", {
      is: Joi.valid(SELL),
      then: Joi.required(),
    })
    .messages({
      "number.base": "The price must be a number.",
      "number.min": "The price must be not less than 1.",
      "any.required": "The price field is required.",
    }),

  // *-* comments *-*
  comments: Joi.string().max(140).messages({
    "string.base": "The location must be a string.",
    "string.max": "The type must be not greater than 140 symbols.",
  }),
})

// *-* Parameter schemas *-*
const paramsNoticeSchema = Joi.object({
  page: Joi.number().min(0).messages({
    "number.base": "The page must be a number.",
    "number.min": "The page must be not less than 0.",
  }),
  limit: Joi.number().min(0).max(36).messages({
    "number.base": "The limit must be a number.",
    "number.min": "The limit must be not less than 0.",
    "number.max": "The limit must be not greater than 36.",
  }),
  category: Joi.string().valid(SELL, LOSTFOUND, FORFREE).messages({
    "string.base": "The category must be a string.",
    "any.only": "The category must be one of: sell, lost-found, for-free",
  }),
  sex: Joi.string()
    .valid(...Object.values(noticeSexes))
    .messages({
      "string.base": "The category must be a string.",
      "any.only": "The category must be one of: male, female",
    }),
  dateone: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  datetwo: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  datethree: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  query: Joi.string().max(32).messages({
    "string.base": "The query must be a string.",
    "string.max": "The query must be not greater than 32 symbols.",
  }),
})

const paramsNoticeSecondSchema = Joi.object({
  page: Joi.number().min(0).messages({
    "number.base": "The page must be a number.",
    "number.min": "The page must be not less than 0.",
  }),
  limit: Joi.number().min(0).max(36).messages({
    "number.base": "The limit must be a number.",
    "number.min": "The limit must be not less than 0.",
    "number.max": "The limit must be not greater than 36.",
  }),
  sex: Joi.string()
    .valid(...Object.values(noticeSexes))
    .messages({
      "string.base": "The category must be a string.",
      "any.only": "The category must be one of: male, female",
    }),
  dateone: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  datetwo: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  datethree: Joi.string().messages({
    "string.base": "The category must be a string.",
  }),
  query: Joi.string().max(32).messages({
    "string.base": "The query must be a string.",
    "string.max": "The query must be not greater than 32 symbols.",
  }),
})

const schemas = {
  addNoticeSchema,
  paramsNoticeSchema,
  paramsNoticeSecondSchema,
}

const Notice = model("notice", noticeSchema)

module.exports = { Notice, schemas }
