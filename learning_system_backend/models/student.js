// models/Student.mjs
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: String,
    classId: String,
});

export default mongoose.model("Student", StudentSchema);