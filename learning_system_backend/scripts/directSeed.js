import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
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
try {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB Connected');
  
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
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
} catch (error) {
  console.error(`Error: ${error.message}`);
} finally {
  // Ensure connection is closed even if there's an error
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
} 