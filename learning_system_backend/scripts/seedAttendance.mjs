import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the attendance schema
const attendanceSchema = new mongoose.Schema({
  date: String,
  students: [{ 
    id: Number, 
    name: String, 
    present: Boolean 
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update the updatedAt field
attendanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learning_system');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// Seed data
const seedAttendance = async () => {
  try {
    // Clear existing data
    await Attendance.deleteMany({});
    console.log('Deleted existing attendance records');

    // Create sample attendance data
    const sampleData = {
      date: '2025-03-03',
      students: [
        { id: 1, name: 'John Smith', present: true },
        { id: 2, name: 'Jane Doe', present: true },
        { id: 3, name: 'Michael Johnson', present: true },
        { id: 4, name: 'Emily Williams', present: false },
        { id: 5, name: 'David Brown', present: false }
      ]
    };

    await Attendance.create(sampleData);
    console.log('Sample attendance data created successfully');

    // Disconnect from MongoDB
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(`Error seeding attendance data: ${error.message}`);
    process.exit(1);
  }
};

// Run the seed function
connectDB().then(() => {
  seedAttendance();
}); 