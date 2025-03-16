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

// Create the Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Connect to MongoDB
const connectAndTest = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Connection string:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    // Test finding all attendance records
    console.log('Fetching all attendance records...');
    const records = await Attendance.find().sort({ date: -1 });
    console.log(`Found ${records.length} attendance records`);
    
    if (records.length > 0) {
      console.log('First record:');
      console.log(JSON.stringify(records[0], null, 2));
    } else {
      console.log('No attendance records found');
    }
    
    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(error.stack);
  }
};

// Run the test
connectAndTest(); 