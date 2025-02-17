import mongoose from "mongoose"

const progressEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["On Track", "Needs Attention", "Improving", "Outstanding", "Positive"],
    required: true,
  },
})

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  currentStatus: {
    type: String,
    enum: ["On Track", "Needs Attention", "Improving", "Outstanding"],
    default: "On Track",
  },
  progressHistory: [progressEntrySchema],
})

// Add text index for search functionality
studentSchema.index({ name: "text" })

export default mongoose.model("Student", studentSchema)

