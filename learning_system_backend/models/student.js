import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  class: String,
  age: Number,
  gender: String,
  parentName: String,
  phone: String,
  email: String,
  address: String,
});

export default mongoose.model("Student", studentSchema);
