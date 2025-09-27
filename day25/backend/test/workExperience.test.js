//not working need to fix
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server"); // Import app
const WorkExperience = require("../models/work-experience");
const { mongo_port, mongo_url } = require("../db/config");
const { beforeAll, afterAll, beforeEach, describe, it, expect } = require("@jest/globals");
const ConnectToMongoDB = require("../db/connecttodb");



//test all api end pointe
beforeAll(async () => {
  await mongoose.connect(`mongodb://${mongo_url}:${mongo_port}/jest_users`, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

beforeEach(async () => {
    await WorkExperience.deleteMany({});
});

describe("Work Experience API", () => {
    let workExperienceId; // Variable to store the ID of the created work experience

    // Test POST /api/work-experience
    it("should create a new work experience", async () => {
        const newWorkExperience = {
            companyName: "Tech Corp",
            position: "Software Engineer",
            startDate: "2020-01-01",
            endDate: "2021-01-01",
            responsibilities: "Developed web applications",
            location: "New York, NY",
            state: "NY"
        };
        const res = await request(app)
            .post("/api/work-experience")
            .send(newWorkExperience);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");
        expect(res.body.companyName).toBe(newWorkExperience.companyName);
        workExperienceId = res.body._id; // Store the ID for later tests
    }
    );
    // Test GET /api/work-experience
    it("should retrieve all work experiences", async () => {
        const res = await request(app).get("/api/work-experience");
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }
    );
    // Test GET /api/work-experience/:id
    it("should retrieve a work experience by ID", async () => {
        const res = await request(app).get(`/api/work-experience/${workExperienceId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("_id", workExperienceId);
    }
    );
    // Test GET /api/work-search?state=NY
    it("should search work experiences by state", async () => {
        const res = await request(app).get("/api/work-search").query({ state: "NY" });
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    }
    );
    // Test PUT /api/work-experience/:id
    it("should update a work experience by ID", async () => {
        const updatedData = { position: "Senior Software Engineer" };
        const res = await request(app)
            .put(`/api/work-experience/${workExperienceId}`)
            .send(updatedData);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("position", updatedData.position);
    }
    );
    // Test DELETE /api/work-experience/:id
    it("should delete a work experience by ID", async () => {
        const res = await request(app).delete(`/api/work-experience/${workExperienceId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Work experience deleted successfully");
    }
    );
}
);

