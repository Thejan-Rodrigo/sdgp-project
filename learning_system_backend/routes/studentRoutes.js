import express from "express";
import getStudentDetails from "../controllers/studentController.js";

const router = express.Router();

router.get("/:studentId", (req, res, next) => {
    console.log(`Student route matched: ${req.params.studentId}`);
    next();
}, getStudentDetails);

export default router;
