import express from "express"
import { getAllStudents, getStudentById, addProgressNote, createStudent } from "../controllers/studentController.js"

const router = express.Router()

router.get("/", getAllStudents)
router.get("/:id", getStudentById)
router.post("/", createStudent)
router.post("/:id/progress", addProgressNote)

export default router

