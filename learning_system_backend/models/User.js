import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: function () {
        return this.role !== "superadmin"; // School ID is required unless the role is superadmin
      },
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["superadmin", "admin", "teacher", "parent", "student"], 
      required: true 
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: function () {
        return this.role === "parent"; // Only required for parents
      },
      validate: {
        validator: function (value) {
          // Only validate if the role is parent
          if (this.role === "parent") {
            return value !== null && value !== undefined;
          }
          return true; // Skip validation for other roles
        },
        message: "Student ID is required for parents.",
      },
    },
  },
  { timestamps: true } //Automatically adds createdAt & updatedAt
);

/*const userSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: function () { return this.role !== "student"; } }, // Students don't need passwords
  role: { type: String, enum: ["admin", "teacher", "parent"], required: true },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },

  // Parent-specific field (stores the student's ID)
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" } // ✅ Only for parents
}, { timestamps: true });*/

//Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;