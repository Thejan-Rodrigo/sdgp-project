import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import studentRoutes from "./routes/studentRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js"

const app = express()

dotenv.config();
connectDB();

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/students", studentRoutes)

// Error handling
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app