import Student from "../models/student.js"
import { ApiError } from "../utils/ApiError.js"
import { catchAsync } from "../utils/catchAsync.js"

export const getAllStudents = catchAsync(async (req, res) => {
  const { class: className, search } = req.query

  const query = {}

  if (className) {
    query.class = className
  }

  if (search) {
    query.$text = { $search: search }
  }

  const students = await Student.find(query).select("name class currentStatus lastUpdated").sort("-lastUpdated")

  res.json(students)
})

export const getStudentById = catchAsync(async (req, res) => {
  const student = await Student.findById(req.params.id)

  if (!student) {
    throw new ApiError(404, "Student not found")
  }

  res.json(student)
})

export const addProgressNote = catchAsync(async (req, res) => {
  const { note, status } = req.body

  if (!note || !status) {
    throw new ApiError(400, "Note and status are required")
  }

  const student = await Student.findById(req.params.id)

  if (!student) {
    throw new ApiError(404, "Student not found")
  }

  student.progressHistory.push({ note, status })
  student.currentStatus = status
  student.lastUpdated = new Date()

  await student.save()

  res.json(student)
})

export const createStudent = catchAsync(async (req, res) => {
  const { name, class: className } = req.body

  if (!name || !className) {
    throw new ApiError(400, "Name and class are required")
  }

  const student = await Student.create({
    name,
    class: className,
  })

  res.status(201).json(student)
})

