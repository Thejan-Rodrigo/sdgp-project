import express from "express";
import announcementController from "../controllers/announcementController.js";
import auth from "../middleware/authMiddlewere.js";
import validate from "../middleware/validate.middleware.js";
import announcementValidation from "../validations/announcement.validation.js";

const router = express.Router();

router.get(
  "/",
  auth(),
  announcementController.getAnnouncements
);
router.post(
  "/:id/read",
  auth(),
  announcementController.markAsRead
);
router.get("/:id/read-status",auth(), announcementController.getReadStatus);

router.get(
  '/get-one/:id',
  auth(),
  announcementController.getAnnouncement
);

router.use(auth("teacher", "admin", "superadmin"));
router.post(
  "/",
  announcementController.createAnnouncement
);
router.put(
  "/:id",
  announcementController.updateAnnouncement
);
router.delete(
  "/:id",
  validate(announcementValidation.deleteAnnouncement),
  announcementController.deleteAnnouncement
);
router.get(
  "/stats",
  announcementController.getAnnouncementStats
);

export default router;
