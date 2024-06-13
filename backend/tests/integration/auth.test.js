const supertest = require("supertest")
const app = require("../../app")
const mongoose = require("mongoose")
const { User } = require("../../models/user")

require("dotenv").config()
const { DB_HOST_TEST } = process.env

describe("POST /login", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST)
  })

  afterAll(async () => {
    await User.deleteMany()
    await mongoose.disconnect()
  })

  it("should register user", async () => {
    const response = await supertest(app).post("/users/register").send({
      name: "testUser2",
      email: "testUser2@gmail.com",
      password: "123456",
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toStrictEqual({
      user: {
        email: expect.any(String),
        name: expect.any(String),
        subscription: expect.any(String),
      },
    })
  })

  it("can not register 2 users with the same email", async () => {
    const email = "testUser2@gmail.com"
    await supertest(app).post("/users/register").send({
      email: "testUser2@gmail.com",
      password: "123456",
    })

    const response = await supertest(app).post("/users/register").send({
      email,
      name: "testUser2",
      password: "123456",
    })

    expect(response.statusCode).toBe(409)
  })

  it("should login user", async () => {
    const response = await supertest(app).post("/users/login").send({
      email: "testUser2@gmail.com",
      password: "123456",
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual({
      token: expect.any(String),
      user: {
        email: expect.any(String),
        name: expect.any(String),
        subscription: expect.any(String),
      },
    })
  })
})
