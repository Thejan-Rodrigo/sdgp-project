import express from "express";
import Student from "../models/Student.js"; // Import the Student model
import User from "../models/User.js"; // Import the User model
import chatController from "../controllers/chatController.js"; // Import the chat controller

const router = express.Router();

// ✅ Get students by school ID (updated to use Student model)
router.get("/students/bySchool/:schoolId", async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Find students with the matching schoolId
    const students = await Student.find({ schoolId });

    if (!students.length) {
      return res.status(404).json({ message: "No students found for this school" });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get teachers by school ID (updated to use User model)
router.get("/teachers/bySchool/:schoolId", async (req, res) => {
  try {
    const { schoolId } = req.params;

    // Find users with the role "teacher" and matching schoolId
    const teachers = await User.find({ role: "teacher", schoolId });

    if (!teachers.length) {
      return res.status(404).json({ message: "No teachers found for this school" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get all superadmins (stored in the users collection)
router.get("/superadmins", async (req, res) => {
  try {
    // Find users with the role "superadmin"
    const superadmins = await User.find({ role: "superadmin" });

    if (!superadmins.length) {
      return res.status(404).json({ message: "No superadmins found" });
    }

    res.status(200).json(superadmins);
  } catch (error) {
    console.error("Error fetching superadmins:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get all admins (stored in the users collection)
router.get("/admins", async (req, res) => {
  try {
    // Find users with the role "admin"
    const admins = await User.find({ role: "admin" });

    if (!admins.length) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get chat history between two users
router.get("/get/:senderId/:receiverId", chatController.getChatHistory);
// Route to send a message
router.post("/send", chatController.sendMessage);

export default router;