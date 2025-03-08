// routes/studentRoutes.js
import express from "express";
import { getStudentDetails } from "../controllers/studentController.js";

const router = express.Router();

router.get("/:studentId", getStudentDetails);

export default router;
