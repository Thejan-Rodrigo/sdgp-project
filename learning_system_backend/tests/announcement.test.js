import request from "supertest";
import express from "express";
import mongoose from "mongoose"; // Import mongoose for generating valid ObjectIds
import announcementRouter from "../routes/AnnouncementRouter.js"; // For attaching to the app

// Mock the auth middleware to bypass authentication
jest.mock("../middleware/authMiddlewere.js", () => ({
  __esModule: true, // Ensures compatibility with ES module exports
  default: (...requiredRights) => (req, res, next) => {
    req.user = { _id: "123", schoolId: "456", role: "teacher" }; // Mock a user
    next();
  },
}));

// Mock the announcementController methods
jest.mock("../controllers/announcementController.js", () => ({
  createAnnouncement: jest.fn((req, res) =>
    res.status(201).json({
      data: { announcement: { id: 1, title: "Test Announcement", content: "Test Content" } },
      message: "Announcement created successfully",
      success: true,
    })
  ),
  getAnnouncements: jest.fn((req, res) =>
    res.status(200).json({
      data: {
        announcements: [
          { id: 1, title: "Test Announcement 1", content: "Test Content 1" },
          { id: 2, title: "Test Announcement 2", content: "Test Content 2" },
        ],
        pagination: { page: 1, limit: 10, total: 2, pages: 1 },
      },
      success: true,
    })
  ),
  getAnnouncement: jest.fn((req, res) =>
    res.status(200).json({
      data: { announcement: { id: 1, title: "Test Announcement", content: "Test Content" } },
      success: true,
    })
  ),
  updateAnnouncement: jest.fn((req, res) =>
    res.status(200).json({
      data: { announcement: { id: 1, title: "Updated Announcement", content: "Updated Content" } },
      message: "Announcement updated successfully",
      success: true,
    })
  ),
  deleteAnnouncement: jest.fn((req, res) =>
    res.status(200).json({
      message: "Announcement deleted successfully",
      success: true,
    })
  ),
  markAsRead: jest.fn((req, res) =>
    res.status(200).json({
      message: "Announcement marked as read",
      success: true,
    })
  ),
  getReadStatus: jest.fn((req, res) =>
    res.status(200).json({
      data: {
        status: {
          total: 1,
          readers: [{ user: { id: "123", firstName: "John", lastName: "Doe" }, readAt: "2023-10-01T00:00:00Z" }],
        },
      },
      success: true,
    })
  ),
  getAnnouncementStats: jest.fn((req, res) =>
    res.status(200).json({
      data: { stats: { total: 5, read: 3, unread: 2 } },
      success: true,
    })
  ),
}));

// Create an Express app and use the announcementRouter
const app = express();
app.use(express.json());
app.use("/api/v1/announcements", announcementRouter); // Attach the router to the app

describe("Announcement Router Tests", () => {
  // Test POST /api/v1/announcements/
  describe("POST /api/v1/announcements/", () => {
    it("should create a new announcement and return 201 status", async () => {
      const announcementData = {
        title: "Test Announcement",
        content: "Test Content",
        targetAudience: ["teachers"],
      };

      const res = await request(app)
        .post("/api/v1/announcements/")
        .send(announcementData);

      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Announcement created successfully");
      expect(res.body.data.announcement).toHaveProperty("id");
      expect(res.body.data.announcement.title).toBe("Test Announcement");
      expect(res.body.data.announcement.content).toBe("Test Content");
    });
  });

  // Test GET /api/v1/announcements/
  describe("GET /api/v1/announcements/", () => {
    it("should fetch all announcements and return 200 status", async () => {
      const res = await request(app).get("/api/v1/announcements/");

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.announcements).toBeInstanceOf(Array);
      expect(res.body.data.announcements.length).toBeGreaterThan(0);
      expect(res.body.data.pagination).toHaveProperty("page");
      expect(res.body.data.pagination).toHaveProperty("limit");
      expect(res.body.data.pagination).toHaveProperty("total");
      expect(res.body.data.pagination).toHaveProperty("pages");
    });
  });

  // Test GET /api/v1/announcements/get-one/:id
  describe("GET /api/v1/announcements/get-one/:id", () => {
    it("should fetch a single announcement and return 200 status", async () => {
      const announcementId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

      const res = await request(app).get(`/api/v1/announcements/get-one/${announcementId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.announcement).toHaveProperty("id");
      expect(res.body.data.announcement.title).toBe("Test Announcement");
      expect(res.body.data.announcement.content).toBe("Test Content");
    });
  });

  // Test PUT /api/v1/announcements/:id
  describe("PUT /api/v1/announcements/:id", () => {
    it("should update an announcement and return 200 status", async () => {
      const announcementId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId
      const updateData = {
        title: "Updated Announcement",
        content: "Updated Content",
      };

      const res = await request(app)
        .put(`/api/v1/announcements/${announcementId}`)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Announcement updated successfully");
      expect(res.body.data.announcement).toHaveProperty("id");
      expect(res.body.data.announcement.title).toBe("Updated Announcement");
      expect(res.body.data.announcement.content).toBe("Updated Content");
    });
  });

  // Test DELETE /api/v1/announcements/:id
  describe("DELETE /api/v1/announcements/:id", () => {
    it("should delete an announcement and return 200 status", async () => {
      const announcementId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

      const res = await request(app).delete(`/api/v1/announcements/${announcementId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Announcement deleted successfully");
    });
  });

  // Test POST /api/v1/announcements/:id/read
  describe("POST /api/v1/announcements/:id/read", () => {
    it("should mark an announcement as read and return 200 status", async () => {
      const announcementId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

      const res = await request(app).post(`/api/v1/announcements/${announcementId}/read`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe("Announcement marked as read");
    });
  });

  // Test GET /api/v1/announcements/:id/read-status
  describe("GET /api/v1/announcements/:id/read-status", () => {
    it("should fetch the read status of an announcement and return 200 status", async () => {
      const announcementId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

      const res = await request(app).get(`/api/v1/announcements/${announcementId}/read-status`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toHaveProperty("total");
      expect(res.body.data.status.readers).toBeInstanceOf(Array);
    });
  });

  // Test GET /api/v1/announcements/stats
  describe("GET /api/v1/announcements/stats", () => {
    it("should fetch announcement statistics and return 200 status", async () => {
      const res = await request(app).get("/api/v1/announcements/stats");

      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.stats).toHaveProperty("total");
      expect(res.body.data.stats).toHaveProperty("read");
      expect(res.body.data.stats).toHaveProperty("unread");
    });
  });
});