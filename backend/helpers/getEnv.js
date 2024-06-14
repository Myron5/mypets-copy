require("dotenv").config()

const {
  NODE_ENV,
  BASE_URL_PROD,
  BASE_URL_FRONTEND_PROD,
  BASE_URL_DEV,
  BASE_URL_FRONTEND_DEV,
} = process.env

const getEnv = () => {
  switch (NODE_ENV) {
    case "production":
      return {
        BASE_URL: BASE_URL_PROD,
        BASE_URL_FRONTEND: BASE_URL_FRONTEND_PROD,
      }
    case "development":
      return {
        BASE_URL: BASE_URL_DEV,
        BASE_URL_FRONTEND: BASE_URL_FRONTEND_DEV,
      }
    default:
      return {
        BASE_URL: null,
        BASE_URL_FRONTEND: null,
      }
  }
}

module.exports = getEnv
