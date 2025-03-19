import express from "express";
import { addMeeting, getMeetings, deleteMeeting, getMeetingsBySchoolId } from "../../controllers/meetingController.mjs";

const router = express.Router();

router.post("/addmeeting", addMeeting); // POST: Add meeting & return all
router.get("/meetings", getMeetings);   // GET: Fetch all meetings
router.get("/meetings/school/:schoolId", getMeetingsBySchoolId); // GET: Fetch meetings by schoolId
router.delete("/deletemeeting/:id", deleteMeeting); // Delete a meeting by ID

export default router;