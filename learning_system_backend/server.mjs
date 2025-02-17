import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import studentRoutes from "./routes/studentRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/students", studentRoutes)

// Error handling
app.use(errorHandler)

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected Successfully!")
  } catch (error) {
    console.error("MongoDB Connection Failed:", error)
    process.exit(1)
  }
}

connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app

