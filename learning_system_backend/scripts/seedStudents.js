import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "teacher", "parent", "student"], required: true },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create the User model
const User = mongoose.model("User", userSchema);

// Create a dummy school ID (since it's required)
const dummySchoolId = new mongoose.Types.ObjectId();

// Sample student data
const sampleStudents = [
  {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    password: "password123",
    role: "student",
    schoolId: dummySchoolId
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    password: "password123",
    role: "student",
    schoolId: dummySchoolId
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    password: "password123",
    role: "student",
    schoolId: dummySchoolId
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    email: "emily.williams@example.com",
    password: "password123",
    role: "student",
    schoolId: dummySchoolId
  },
  {
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    password: "password123",
    role: "student",
    schoolId: dummySchoolId
  }
];

// Connect to MongoDB and seed data
const seedStudents = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    // Check if students already exist
    const existingStudents = await User.find({ role: 'student' });
    
    if (existingStudents.length > 0) {
      console.log(`Found ${existingStudents.length} existing students. Skipping seed.`);
      console.log('Existing students:');
      existingStudents.forEach(student => {
        console.log(`- ${student.firstName} ${student.lastName} (${student.email})`);
      });
    } else {
      // Create students
      console.log('Creating sample students...');
      await User.create(sampleStudents);
      console.log(`Created ${sampleStudents.length} sample students`);
    }
    
    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error.stack);
    
    // Ensure connection is closed even if there's an error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('MongoDB connection closed');
    }
  }
};

// Run the seed function
seedStudents(); 