const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/user");

// MongoDB Atlas credentials
const username = "";
const password = encodeURIComponent(""); // encode password
const cluster = "";
const MONGO_URI = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Connect to a separate test database before all tests
beforeAll(async () => {
  await mongoose.connect(MONGO_URI, { dbName: "jest_users" });
});

// Clean DB before each test
beforeEach(async () => {
  await User.deleteMany();
  await User.create([
    { username: "John Doe", email: "john@example.com", password: "123123" },
    { username: "Jane Smith", email: "jane@example.com", password: "123123" }
  ]);
});

// Close DB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Users API", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.count).toBe(2);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should create a new user", async () => {
    const newUser = {
      username: "TestUser",
      email: "test@example.com",
      password: "password"
    };

    const response = await request(app)
      .post("/api/users")
      .send(newUser)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.username).toBe(newUser.username);
  });
});
