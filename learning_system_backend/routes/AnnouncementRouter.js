import express from "express";
import announcementController from "../controllers/announcementController.js";
import auth from "../middleware/authMiddlewere.js";
import validate from "../middleware/validate.middleware.js";
import announcementValidation from "../validations/announcement.validation.js";

const router = express.Router();

// All authenticated users can view and mark announcements as read
router.use(auth());
router.get(
  "/",
  validate(announcementValidation.getAnnouncements),
  announcementController.getAnnouncements
);
// router.get(
//   "/:id",
//   validate(announcementValidation.getAnnouncement),
//   announcementController.getAnnouncement
// );
router.post(
  "/:id/read",
  validate(announcementValidation.markAsRead),
  announcementController.markAsRead
);
router.get("/read-status/:id", announcementController.getReadStatus);

router.get(
  '/:id',
  auth(),
  validate(announcementValidation.getAnnouncement),
  announcementController.getAnnouncement
);

// Teacher and Admin routes
router.use(auth("teacher", "admin"));
router.post(
  "/",
  validate(announcementValidation.createAnnouncement),
  announcementController.createAnnouncement
);
router.put(
  "/:id",
  validate(announcementValidation.updateAnnouncement),
  announcementController.updateAnnouncement
);
router.delete(
  "/:id",
  validate(announcementValidation.deleteAnnouncement),
  announcementController.deleteAnnouncement
);
router.get(
  "/stats",
  validate(announcementValidation.getStats),
  announcementController.getAnnouncementStats
);

export default router;
