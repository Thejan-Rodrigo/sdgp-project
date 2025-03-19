import request from "supertest";
import express from "express";
import authRouter from "../routes/authRoutes.js"; // Adjust the path as needed
import authController from "../controllers/authController.js"; // For mocking
import authService from "../services/authService.js"; // For mocking

// Mock the authController methods
jest.mock("../controllers/authController.js", () => ({
  register: jest.fn((req, res) =>
    res.status(201).json({ user: { id: 1, name: "Test User" }, token: "test-token" })
  ),
  login: jest.fn((req, res) =>
    res.status(200).json({ user: { id: 1, name: "Test User" }, token: "test-token" })
  ),
  getUsersBySchoolId: jest.fn((req, res) =>
    res.status(200).json({
      users: {
        teachers: [{ id: 1, name: "Teacher 1" }],
        parents: [{ id: 2, name: "Parent 1" }],
        students: [{ id: 3, name: "Student 1" }],
      },
    })
  ),
  deleteTeacherById: jest.fn((req, res) => res.status(204).send()),
  deleteParentAndStudentById: jest.fn((req, res) => res.status(204).send()),
}));

// Mock the authService methods
jest.mock("../services/authService.js", () => ({
  createUser: jest.fn(() => ({ id: 1, name: "Test User" })),
  createTeacher: jest.fn(() => ({ id: 1, name: "Test Teacher" })),
  createStudentAndParent: jest.fn(() => ({
    student: { id: 1, name: "Test Student" },
    parent: { id: 2, name: "Test Parent" },
  })),
  loginWithEmailAndPassword: jest.fn(() => ({ id: 1, name: "Test User" })),
  generateAuthToken: jest.fn(() => "test-token"),
  getUsersBySchoolId: jest.fn(() => ({
    teachers: [{ id: 1, name: "Teacher 1" }],
    parents: [{ id: 2, name: "Parent 1" }],
    students: [{ id: 3, name: "Student 1" }],
  })),
  deleteTeacherById: jest.fn(),
  deleteParentAndStudentById: jest.fn(),
}));

// Create an Express app and use the authRouter
const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Router", () => {
  // Test POST /auth/register
  describe("POST /auth/register", () => {
    it("should register a new user and return 201 status", async () => {
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        role: "teacher",
        schoolId: "12345",
      };

      const res = await request(app)
        .post("/auth/register")
        .send(userData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
    });
  });

  // Test POST /auth/login
  describe("POST /auth/login", () => {
    it("should log in a user and return 200 status", async () => {
      const loginData = {
        email: "john.doe@example.com",
        password: "password123",
      };

      const res = await request(app)
        .post("/auth/login")
        .send(loginData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("user");
      expect(res.body).toHaveProperty("token");
      expect(res.body.user).toHaveProperty("id");
      expect(res.body.user).toHaveProperty("name");
    });
  });

  // Test GET /auth/users/:schoolId
  describe("GET /auth/users/:schoolId", () => {
    it("should fetch users by school ID and return 200 status", async () => {
      const schoolId = "12345";

      const res = await request(app).get(`/auth/users/${schoolId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("users");
      expect(res.body.users).toHaveProperty("teachers");
      expect(res.body.users).toHaveProperty("parents");
      expect(res.body.users).toHaveProperty("students");
      expect(res.body.users.teachers).toBeInstanceOf(Array);
      expect(res.body.users.parents).toBeInstanceOf(Array);
      expect(res.body.users.students).toBeInstanceOf(Array);
    });
  });

  // Test DELETE /auth/teachers/:teacherId
  describe("DELETE /auth/teachers/:teacherId", () => {
    it("should delete a teacher by ID and return 204 status", async () => {
      const teacherId = "1";

      const res = await request(app).delete(`/auth/teachers/${teacherId}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  // Test DELETE /auth/parents/:parentId
  describe("DELETE /auth/parents/:parentId", () => {
    it("should delete a parent and student by parent ID and return 204 status", async () => {
      const parentId = "1";

      const res = await request(app).delete(`/auth/parents/${parentId}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});