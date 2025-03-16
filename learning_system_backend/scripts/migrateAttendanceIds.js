import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attendance from '../models/Attendance.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learning_system');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const migrateAttendanceIds = async () => {
  try {
    console.log('Starting attendance ID migration...');
    
    // Find all attendance records
    const attendanceRecords = await Attendance.find({});
    console.log(`Found ${attendanceRecords.length} attendance records`);
    
    let updatedCount = 0;
    
    // Process each record
    for (const record of attendanceRecords) {
      let needsUpdate = false;
      
      // Check if any student has a numeric ID
      for (const student of record.students) {
        if (typeof student.id === 'number') {
          // Convert to string
          student.id = student.id.toString();
          needsUpdate = true;
        }
      }
      
      // Save the record if it was updated
      if (needsUpdate) {
        await record.save();
        updatedCount++;
        console.log(`Updated attendance record for date: ${record.date}`);
      }
    }
    
    console.log(`Migration complete. Updated ${updatedCount} records.`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the migration
connectDB()
  .then(() => migrateAttendanceIds())
  .catch(error => {
    console.error('Error in migration script:', error);
    process.exit(1);
  }); 