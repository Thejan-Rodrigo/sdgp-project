import request from "supertest";
import express from "express";
import progressRouter from "../routes/progressRoutes.js"; // Adjust the path as needed
import {
  getProgressByStudent,
  addProgress,
  getStudentsBySchoolId,
  deleteProgressById,
} from "../controllers/progressController.js"; // For mocking
import {
  getProgressByStudentId,
  createProgressNote,
  getStudentsBySchoolId as getStudentsBySchoolIdService,
  deleteProgressById as deleteProgressByIdService,
} from "../services/progressService.js"; // For mocking

// Mock the progressController methods
jest.mock("../controllers/progressController.js", () => ({
  getProgressByStudent: jest.fn((req, res) =>
    res.status(200).json({
      progress: [{ id: 1, studentId: "123", teacherId: "456", notes: "Test note" }],
    })
  ),
  addProgress: jest.fn((req, res) =>
    res.status(201).json({
      newProgress: { id: 1, studentId: "123", teacherId: "456", notes: "Test note" },
    })
  ),
  getStudentsBySchoolId: jest.fn((req, res) =>
    res.status(200).json({
      students: [{ id: 1, name: "Student 1" }, { id: 2, name: "Student 2" }],
    })
  ),
  deleteProgressById: jest.fn((req, res) => res.status(200).json({ deletedProgress: { id: 1 } })),
}));

// Mock the progressService methods
jest.mock("../services/progressService.js", () => ({
  getProgressByStudentId: jest.fn(() => [
    { id: 1, studentId: "123", teacherId: "456", notes: "Test note" },
  ]),
  createProgressNote: jest.fn(() => ({ id: 1, studentId: "123", teacherId: "456", notes: "Test note" })),
  getStudentsBySchoolId: jest.fn(() => [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
  ]),
  deleteProgressById: jest.fn(() => ({ id: 1 })),
}));

// Create an Express app and use the progressRouter
const app = express();
app.use(express.json());
app.use("/progress", progressRouter);

describe("Progress Router", () => {
  // Test GET /progress/student/:id
  describe("GET /progress/student/:id", () => {
    it("should fetch progress by student ID and return 200 status", async () => {
      const studentId = "123";

      const res = await request(app).get(`/progress/student/${studentId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("progress");
      expect(res.body.progress).toBeInstanceOf(Array);
      expect(res.body.progress[0]).toHaveProperty("id");
      expect(res.body.progress[0]).toHaveProperty("studentId");
      expect(res.body.progress[0]).toHaveProperty("teacherId");
      expect(res.body.progress[0]).toHaveProperty("notes");
    });
  });

  // Test POST /progress/
  describe("POST /progress/", () => {
    it("should add a new progress note and return 201 status", async () => {
      const progressData = {
        studentId: "123",
        teacherId: "456",
        notes: "Test note",
      };

      const res = await request(app)
        .post("/progress/")
        .send(progressData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("newProgress");
      expect(res.body.newProgress).toHaveProperty("id");
      expect(res.body.newProgress).toHaveProperty("studentId");
      expect(res.body.newProgress).toHaveProperty("teacherId");
      expect(res.body.newProgress).toHaveProperty("notes");
    });
  });

  // Test GET /progress/school/:schoolId
  describe("GET /progress/school/:schoolId", () => {
    it("should fetch students by school ID and return 200 status", async () => {
      const schoolId = "12345";

      const res = await request(app).get(`/progress/school/${schoolId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("students");
      expect(res.body.students).toBeInstanceOf(Array);
      expect(res.body.students.length).toBeGreaterThan(0);
      expect(res.body.students[0]).toHaveProperty("id");
      expect(res.body.students[0]).toHaveProperty("name");
    });
  });

  // Test DELETE /progress/:id
  describe("DELETE /progress/:id", () => {
    it("should delete a progress note by ID and return 200 status", async () => {
      const progressId = "1";

      const res = await request(app).delete(`/progress/${progressId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("deletedProgress");
      expect(res.body.deletedProgress).toHaveProperty("id");
    });
  });
});