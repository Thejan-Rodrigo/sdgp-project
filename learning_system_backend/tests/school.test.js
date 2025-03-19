import request from "supertest";
import express from "express";
import schoolRouter from "../routes/schoolRoutes.js"; // Adjust the path as needed
import schoolController from "../controllers/schoolController.js"; // For mocking
import authMiddleware from "../middleware/authMiddleware.js"; // For mocking

// Mock the authMiddleware to bypass authentication
jest.mock("../middleware/authMiddleware.js", () => (req, res, next) => {
  req.user = { role: "superadmin" }; // Mock a superadmin user
  next();
});

// Mock the schoolController methods
jest.mock("../controllers/schoolController.js", () => ({
  createSchool: jest.fn((req, res) =>
    res.status(201).json({
      school: { id: 1, name: "Test School" },
      admin: { id: 1, name: "Test Admin" },
    })
  ),
  getAllSchools: jest.fn((req, res) =>
    res.status(200).json({
      schools: [{ id: 1, name: "Test School 1" }, { id: 2, name: "Test School 2" }],
    })
  ),
  deleteSchoolById: jest.fn((req, res) => res.status(204).send()),
}));

// Create an Express app and use the schoolRouter
const app = express();
app.use(express.json());
app.use("/school", schoolRouter);

describe("School Router", () => {
  // Test POST /school/create
  describe("POST /school/create", () => {
    it("should create a new school and admin and return 201 status", async () => {
      const schoolData = {
        schoolName: "Test School",
        schoolAddress: "123 Test St",
        district: "Test District",
        province: "Test Province",
        firstName: "John",
        lastName: "Doe",
        dateOfBirth: "1990-01-01",
        phone: "1234567890",
        email: "john.doe@example.com",
        adminAddress: "456 Admin St",
        password: "password123",
      };

      const res = await request(app)
        .post("/school/create")
        .send(schoolData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("school");
      expect(res.body).toHaveProperty("admin");
      expect(res.body.school).toHaveProperty("id");
      expect(res.body.school).toHaveProperty("name");
      expect(res.body.admin).toHaveProperty("id");
      expect(res.body.admin).toHaveProperty("name");
    });
  });

  // Test GET /school/getallschools
  describe("GET /school/getallschools", () => {
    it("should fetch all schools and return 200 status", async () => {
      const res = await request(app).get("/school/getallschools");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("schools");
      expect(res.body.schools).toBeInstanceOf(Array);
      expect(res.body.schools.length).toBeGreaterThan(0);
      expect(res.body.schools[0]).toHaveProperty("id");
      expect(res.body.schools[0]).toHaveProperty("name");
    });
  });

  // Test DELETE /school/:id
  describe("DELETE /school/:id", () => {
    it("should delete a school by ID and return 204 status", async () => {
      const schoolId = "1";

      const res = await request(app).delete(`/school/${schoolId}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});