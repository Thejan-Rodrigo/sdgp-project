import { studentService } from "../services/studentService.js"
import { ApiError } from "../utils/ApiError.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getAllStudents = catchAsync(async (req, res) => {
  const { class: className, search } = req.query
  const students = await studentService.getAllStudents(className, search)
  res.json(students)
})

export const getStudentById = catchAsync(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id)
  res.json(student)
})

export const addProgressNote = catchAsync(async (req, res) => {
  const { note, status } = req.body

  if (!note || !status) {
    throw new ApiError(400, "Note and status are required")
  }

  const student = await studentService.addProgressNote(req.params.id, note, status)
  res.json(student)
})

export const createStudent = catchAsync(async (req, res) => {
  const { name, class: className } = req.body

  if (!name || !className) {
    throw new ApiError(400, "Name and class are required")
  }

  const student = await studentService.createStudent(name, className)
  res.status(201).json(student)
})

