import request from "supertest";
import express from "express";
import meetingRouter from "../api/router/meetingRoutes.mjs"; // Adjust the path as needed
import {
  addMeeting,
  getMeetings,
  getMeetingsBySchoolId,
  deleteMeeting,
} from "../controllers/meetingController.mjs"; // For mocking
import Meeting from "../models/Meeting.mjs"; // For mocking

// Mock the Meeting model
jest.mock("../models/Meeting.mjs", () => ({
  find: jest.fn(),
  findByIdAndDelete: jest.fn(),
  save: jest.fn(),
}));

// Mock the meetingController methods
jest.mock("../controllers/meetingController.mjs", () => ({
  addMeeting: jest.fn((req, res) =>
    res.status(201).json([
      { id: 1, name: "Meeting 1", description: "Test Meeting 1", time: "2023-10-01T10:00:00Z", link: "https://meet.google.com/abc123", schoolId: "123", teacherId: "456" },
    ])
  ),
  getMeetings: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, name: "Meeting 1", description: "Test Meeting 1", time: "2023-10-01T10:00:00Z", link: "https://meet.google.com/abc123", schoolId: "123", teacherId: "456" },
      { id: 2, name: "Meeting 2", description: "Test Meeting 2", time: "2023-10-01T12:00:00Z", link: "https://meet.google.com/def456", schoolId: "456", teacherId: "789" },
    ])
  ),
  getMeetingsBySchoolId: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, name: "Meeting 1", description: "Test Meeting 1", time: "2023-10-01T10:00:00Z", link: "https://meet.google.com/abc123", schoolId: "123", teacherId: "456" },
    ])
  ),
  deleteMeeting: jest.fn((req, res) =>
    res.status(200).json([
      { id: 2, name: "Meeting 2", description: "Test Meeting 2", time: "2023-10-01T12:00:00Z", link: "https://meet.google.com/def456", schoolId: "456", teacherId: "789" },
    ])
  ),
}));

// Create an Express app and use the meetingRouter
const app = express();
app.use(express.json());
app.use("/meeting", meetingRouter);

describe("Meeting Router", () => {
  // Test POST /meeting/addmeeting
  describe("POST /meeting/addmeeting", () => {
    it("should add a new meeting and return 201 status", async () => {
      const meetingData = {
        name: "Meeting 1",
        description: "Test Meeting 1",
        time: "2023-10-01T10:00:00Z",
        link: "https://meet.google.com/abc123",
        schoolId: "123",
        teacherId: "456",
      };

      const res = await request(app)
        .post("/meeting/addmeeting")
        .send(meetingData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("description");
      expect(res.body[0]).toHaveProperty("time");
      expect(res.body[0]).toHaveProperty("link");
      expect(res.body[0]).toHaveProperty("schoolId");
      expect(res.body[0]).toHaveProperty("teacherId");
    });
  });

  // Test GET /meeting/meetings
  describe("GET /meeting/meetings", () => {
    it("should fetch all meetings and return 200 status", async () => {
      const res = await request(app).get("/meeting/meetings");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("description");
      expect(res.body[0]).toHaveProperty("time");
      expect(res.body[0]).toHaveProperty("link");
      expect(res.body[0]).toHaveProperty("schoolId");
      expect(res.body[0]).toHaveProperty("teacherId");
    });
  });

  // Test GET /meeting/meetings/school/:schoolId
  describe("GET /meeting/meetings/school/:schoolId", () => {
    it("should fetch meetings by school ID and return 200 status", async () => {
      const schoolId = "123";

      const res = await request(app).get(`/meeting/meetings/school/${schoolId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("description");
      expect(res.body[0]).toHaveProperty("time");
      expect(res.body[0]).toHaveProperty("link");
      expect(res.body[0]).toHaveProperty("schoolId");
      expect(res.body[0]).toHaveProperty("teacherId");
    });
  });

  // Test DELETE /meeting/deletemeeting/:id
  describe("DELETE /meeting/deletemeeting/:id", () => {
    it("should delete a meeting and return 200 status", async () => {
      const meetingId = "1";

      const res = await request(app).delete(`/meeting/deletemeeting/${meetingId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("description");
      expect(res.body[0]).toHaveProperty("time");
      expect(res.body[0]).toHaveProperty("link");
      expect(res.body[0]).toHaveProperty("schoolId");
      expect(res.body[0]).toHaveProperty("teacherId");
    });
  });
});