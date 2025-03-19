import request from "supertest";
import express from "express";
import adminRouter from "../routes/adminRoutes.js"; // Adjust the path as needed
import adminController from "../controllers/adminController.js"; // For mocking
import authMiddleware from "../middleware/authMiddleware.js"; // For mocking

// Mock the authMiddleware to bypass authentication
jest.mock("../middleware/authMiddleware.js", () => (req, res, next) => {
  req.user = { role: "superadmin" }; // Mock a superadmin user
  next();
});

// Mock the adminController methods
jest.mock("../controllers/adminController.js", () => ({
  addAdmin: jest.fn((req, res) =>
    res.status(201).json({ admin: { id: 1, name: "John Doe" } })
  ),
  getAdminsBySchoolId: jest.fn((req, res) =>
    res.status(200).json({ admins: [{ id: 1, name: "John Doe" }] })
  ),
  deleteAdminById: jest.fn((req, res) => res.status(204).send()),
}));

// Create an Express app and use the adminRouter
const app = express();
app.use(express.json());
app.use("/admin", adminRouter);

describe("Admin Router", () => {
  // Test POST /admin/add
  describe("POST /admin/add", () => {
    it("should create a new admin and return 201 status", async () => {
      const newAdmin = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        schoolId: "12345",
      };

      const res = await request(app)
        .post("/admin/add")
        .send(newAdmin);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("admin");
      expect(res.body.admin).toHaveProperty("id");
      expect(res.body.admin).toHaveProperty("name");
    });
  });

  // Test GET /admin/school/:schoolId
  describe("GET /admin/school/:schoolId", () => {
    it("should fetch admins by school ID and return 200 status", async () => {
      const schoolId = "12345";

      const res = await request(app).get(`/admin/school/${schoolId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("admins");
      expect(res.body.admins).toBeInstanceOf(Array);
      expect(res.body.admins[0]).toHaveProperty("id");
      expect(res.body.admins[0]).toHaveProperty("name");
    });
  });

  // Test DELETE /admin/:adminId
  describe("DELETE /admin/:adminId", () => {
    it("should delete an admin by ID and return 204 status", async () => {
      const adminId = "1";

      const res = await request(app).delete(`/admin/${adminId}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});