import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dateOfBirth: { type: Date, required: true }, // Date of birth
    phone: { type: String, trim: true }, // Phone number
    address: { type: String, trim: true }, // Address
    role: { 
      type: String, 
      enum: ['admin', 'teacher', 'parent', 'student'], 
      default: 'student', // Default role is 'student'
      required: true 
    },
    isActive: { type: Boolean, default: true }, // Active status
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the parent (another user with role 'parent')
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

export default Student;