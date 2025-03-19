import request from "supertest";
import express from "express";
import studentRouter from "../routes/studentRoutes.js"; // Adjust the path as needed
import {
  getStudents,
  getStudentProfile,
  getStudentsBySchool,
  updateStudent,
  getStudentsByParentId,
  getParentById,
  getProgressByParentId,
  getProgressByStudentId,
} from "../controllers/studentController.js"; // For mocking
import {
  getAllStudents,
  getStudentById,
  getStudentsBySchoolId,
  updateStudentById,
  getStudentByParentId,
  getParentById as getParentByIdService,
  getProgressByParentId as getProgressByParentIdService,
  getProgressByStudentId as getProgressByStudentIdService,
} from "../services/studentService.js"; // For mocking

// Mock the studentController methods
jest.mock("../controllers/studentController.js", () => ({
  getStudents: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, name: "Student 1" },
      { id: 2, name: "Student 2" },
    ])
  ),
  getStudentProfile: jest.fn((req, res) =>
    res.status(200).json({ id: 1, name: "Student 1", parentFirstName: "John", parentLastName: "Doe" })
  ),
  getStudentsBySchool: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, name: "Student 1", schoolId: "123" },
      { id: 2, name: "Student 2", schoolId: "123" },
    ])
  ),
  updateStudent: jest.fn((req, res) =>
    res.status(200).json({ id: 1, name: "Updated Student" })
  ),
  getStudentsByParentId: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, name: "Student 1", parentId: "456" },
      { id: 2, name: "Student 2", parentId: "456" },
    ])
  ),
  getParentById: jest.fn((req, res) =>
    res.status(200).json({ id: "456", firstName: "John", lastName: "Doe" })
  ),
  getProgressByParentId: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, studentId: "123", progress: "Good" },
      { id: 2, studentId: "456", progress: "Excellent" },
    ])
  ),
  getProgressByStudentId: jest.fn((req, res) =>
    res.status(200).json([
      { id: 1, studentId: "123", progress: "Good", teacherFirstName: "Jane", teacherLastName: "Smith" },
    ])
  ),
}));

// Mock the studentService methods
jest.mock("../services/studentService.js", () => ({
  getAllStudents: jest.fn(() => [
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
  ]),
  getStudentById: jest.fn(() => ({ id: 1, name: "Student 1", parentFirstName: "John", parentLastName: "Doe" })),
  getStudentsBySchoolId: jest.fn(() => [
    { id: 1, name: "Student 1", schoolId: "123" },
    { id: 2, name: "Student 2", schoolId: "123" },
  ]),
  updateStudentById: jest.fn(() => ({ id: 1, name: "Updated Student" })),
  getStudentByParentId: jest.fn(() => [
    { id: 1, name: "Student 1", parentId: "456" },
    { id: 2, name: "Student 2", parentId: "456" },
  ]),
  getParentById: jest.fn(() => ({ id: "456", firstName: "John", lastName: "Doe" })),
  getProgressByParentId: jest.fn(() => [
    { id: 1, studentId: "123", progress: "Good" },
    { id: 2, studentId: "456", progress: "Excellent" },
  ]),
  getProgressByStudentId: jest.fn(() => [
    { id: 1, studentId: "123", progress: "Good", teacherFirstName: "Jane", teacherLastName: "Smith" },
  ]),
}));

// Create an Express app and use the studentRouter
const app = express();
app.use(express.json());
app.use("/student", studentRouter);

describe("Student Router", () => {
  // Test GET /student/
  describe("GET /student/", () => {
    it("should fetch all students and return 200 status", async () => {
      const res = await request(app).get("/student/");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
    });
  });

  // Test GET /student/:studentId
  describe("GET /student/:studentId", () => {
    it("should fetch a student profile and return 200 status", async () => {
      const studentId = "1";

      const res = await request(app).get(`/student/${studentId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("parentFirstName");
      expect(res.body).toHaveProperty("parentLastName");
    });
  });

  // Test GET /student/school/:schoolId
  describe("GET /student/school/:schoolId", () => {
    it("should fetch students by school ID and return 200 status", async () => {
      const schoolId = "123";

      const res = await request(app).get(`/student/school/${schoolId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("schoolId");
    });
  });

  // Test PUT /student/:studentId
  describe("PUT /student/:studentId", () => {
    it("should update a student and return 200 status", async () => {
      const studentId = "1";
      const updateData = {
        name: "Updated Student",
      };

      const res = await request(app)
        .put(`/student/${studentId}`)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
    });
  });

  // Test GET /student/parent/:parentId
  describe("GET /student/parent/:parentId", () => {
    it("should fetch students by parent ID and return 200 status", async () => {
      const parentId = "456";

      const res = await request(app).get(`/student/parent/${parentId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("parentId");
    });
  });

  // Test GET /student/parent/:parentId/details
  describe("GET /student/parent/:parentId/details", () => {
    it("should fetch parent details by parent ID and return 200 status", async () => {
      const parentId = "456";

      const res = await request(app).get(`/student/parent/${parentId}/details`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("firstName");
      expect(res.body).toHaveProperty("lastName");
    });
  });

  // Test GET /student/parent/:parentId/progress
  describe("GET /student/parent/:parentId/progress", () => {
    it("should fetch progress by parent ID and return 200 status", async () => {
      const parentId = "456";

      const res = await request(app).get(`/student/parent/${parentId}/progress`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("studentId");
      expect(res.body[0]).toHaveProperty("progress");
    });
  });

  // Test GET /student/:studentId/progress
  describe("GET /student/:studentId/progress", () => {
    it("should fetch progress by student ID and return 200 status", async () => {
      const studentId = "123";

      const res = await request(app).get(`/student/${studentId}/progress`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("studentId");
      expect(res.body[0]).toHaveProperty("progress");
      expect(res.body[0]).toHaveProperty("teacherFirstName");
      expect(res.body[0]).toHaveProperty("teacherLastName");
    });
  });
});