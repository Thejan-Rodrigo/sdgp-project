import request from "supertest";
import express from "express";
import announcementRouter from "../routes/AnnouncementRouter.js"; // Adjust the path as needed
import announcementController from "../controllers/announcementController.js"; // For mocking
import announcementService from "../services/announcementService.js"; // For mocking

// Mock the auth middleware to bypass authentication
jest.mock("../middleware/authMiddlewere.js", () => ({
  // Mock the default export of the auth middleware
  default: (...requiredRights) => (req, res, next) => {
    // Initialize req if it's undefined
    req = req || {};
    req.user = { _id: "123", schoolId: "456", role: "teacher" }; // Mock a user
    next();
  },
}));

// Mock the announcementController methods
jest.mock("../controllers/announcementController.js", () => ({
  createAnnouncement: jest.fn((req, res) =>
    res.status(201).json({
      announcement: { id: 1, title: "Test Announcement", content: "Test Content" },
    })
  ),
  getAnnouncements: jest.fn((req, res) =>
    res.status(200).json({
      announcements: [
        { id: 1, title: "Test Announcement 1", content: "Test Content 1" },
        { id: 2, title: "Test Announcement 2", content: "Test Content 2" },
      ],
      pagination: { page: 1, limit: 10, total: 2, pages: 1 },
    })
  ),
  getAnnouncement: jest.fn((req, res) =>
    res.status(200).json({
      announcement: { id: 1, title: "Test Announcement", content: "Test Content" },
    })
  ),
  updateAnnouncement: jest.fn((req, res) =>
    res.status(200).json({
      announcement: { id: 1, title: "Updated Announcement", content: "Updated Content" },
    })
  ),
  deleteAnnouncement: jest.fn((req, res) => res.status(200).json(null)),
  markAsRead: jest.fn((req, res) => res.status(200).json(null)),
  getReadStatus: jest.fn((req, res) =>
    res.status(200).json({
      status: { total: 1, readers: [{ user: { id: "123", firstName: "John", lastName: "Doe" }, readAt: "2023-10-01T00:00:00Z" }] },
    })
  ),
  getAnnouncementStats: jest.fn((req, res) =>
    res.status(200).json({
      stats: { total: 5, read: 3, unread: 2 },
    })
  ),
}));

// Mock the announcementService methods
jest.mock("../services/announcementService.js", () => ({
  createAnnouncement: jest.fn(() => ({ id: 1, title: "Test Announcement", content: "Test Content" })),
  getAnnouncements: jest.fn(() => ({
    announcements: [
      { id: 1, title: "Test Announcement 1", content: "Test Content 1" },
      { id: 2, title: "Test Announcement 2", content: "Test Content 2" },
    ],
    pagination: { page: 1, limit: 10, total: 2, pages: 1 },
  })),
  getAnnouncementById: jest.fn(() => ({ id: 1, title: "Test Announcement", content: "Test Content" })),
  updateAnnouncement: jest.fn(() => ({ id: 1, title: "Updated Announcement", content: "Updated Content" })),
  deleteAnnouncement: jest.fn(),
  markAsRead: jest.fn(),
  getReadStatus: jest.fn(() => ({
    total: 1,
    readers: [{ user: { id: "123", firstName: "John", lastName: "Doe" }, readAt: "2023-10-01T00:00:00Z" }],
  })),
  getAnnouncementStats: jest.fn(() => ({ total: 5, read: 3, unread: 2 })),
}));

// Create an Express app and use the announcementRouter
const app = express();
app.use(express.json());
app.use("/announcement", announcementRouter);

describe("Announcement Router", () => {
  // Test POST /announcement/
  describe("POST /announcement/", () => {
    it("should create a new announcement and return 201 status", async () => {
      const announcementData = {
        title: "Test Announcement",
        content: "Test Content",
        targetAudience: "all",
      };

      const res = await request(app)
        .post("/announcement/")
        .send(announcementData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("announcement");
      expect(res.body.announcement).toHaveProperty("id");
      expect(res.body.announcement).toHaveProperty("title");
      expect(res.body.announcement).toHaveProperty("content");
    });
  });

  // Test GET /announcement/
  describe("GET /announcement/", () => {
    it("should fetch all announcements and return 200 status", async () => {
      const res = await request(app).get("/announcement/");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("announcements");
      expect(res.body.announcements).toBeInstanceOf(Array);
      expect(res.body.announcements.length).toBeGreaterThan(0);
      expect(res.body).toHaveProperty("pagination");
      expect(res.body.pagination).toHaveProperty("page");
      expect(res.body.pagination).toHaveProperty("limit");
      expect(res.body.pagination).toHaveProperty("total");
      expect(res.body.pagination).toHaveProperty("pages");
    });
  });

  // Test GET /announcement/get-one/:id
  describe("GET /announcement/get-one/:id", () => {
    it("should fetch a single announcement and return 200 status", async () => {
      const announcementId = "1";

      const res = await request(app).get(`/announcement/get-one/${announcementId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("announcement");
      expect(res.body.announcement).toHaveProperty("id");
      expect(res.body.announcement).toHaveProperty("title");
      expect(res.body.announcement).toHaveProperty("content");
    });
  });

  // Test PUT /announcement/:id
  describe("PUT /announcement/:id", () => {
    it("should update an announcement and return 200 status", async () => {
      const announcementId = "1";
      const updateData = {
        title: "Updated Announcement",
        content: "Updated Content",
      };

      const res = await request(app)
        .put(`/announcement/${announcementId}`)
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("announcement");
      expect(res.body.announcement).toHaveProperty("id");
      expect(res.body.announcement).toHaveProperty("title");
      expect(res.body.announcement).toHaveProperty("content");
    });
  });

  // Test DELETE /announcement/:id
  describe("DELETE /announcement/:id", () => {
    it("should delete an announcement and return 200 status", async () => {
      const announcementId = "1";

      const res = await request(app).delete(`/announcement/${announcementId}`);

      expect(res.statusCode).toEqual(200);
    });
  });

  // Test POST /announcement/:id/read
  describe("POST /announcement/:id/read", () => {
    it("should mark an announcement as read and return 200 status", async () => {
      const announcementId = "1";

      const res = await request(app).post(`/announcement/${announcementId}/read`);

      expect(res.statusCode).toEqual(200);
    });
  });

  // Test GET /announcement/:id/read-status
  describe("GET /announcement/:id/read-status", () => {
    it("should fetch the read status of an announcement and return 200 status", async () => {
      const announcementId = "1";

      const res = await request(app).get(`/announcement/${announcementId}/read-status`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body.status).toHaveProperty("total");
      expect(res.body.status).toHaveProperty("readers");
      expect(res.body.status.readers).toBeInstanceOf(Array);
    });
  });

  // Test GET /announcement/stats
  describe("GET /announcement/stats", () => {
    it("should fetch announcement statistics and return 200 status", async () => {
      const res = await request(app).get("/announcement/stats");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("stats");
      expect(res.body.stats).toHaveProperty("total");
      expect(res.body.stats).toHaveProperty("read");
      expect(res.body.stats).toHaveProperty("unread");
    });
  });
});