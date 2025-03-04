import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Attendance from '../models/Attendance.js';
import fetch from 'node-fetch';

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

const debugAttendance = async () => {
  try {
    console.log('=== ATTENDANCE DEBUG SCRIPT ===');
    
    // Step 1: Check the Attendance model schema
    console.log('\n1. Checking Attendance model schema:');
    console.log('Attendance schema:', JSON.stringify(Attendance.schema.obj, null, 2));
    
    // Step 2: Check existing attendance records
    console.log('\n2. Checking existing attendance records:');
    const records = await Attendance.find({}).sort({ date: -1 });
    console.log(`Found ${records.length} attendance records`);
    
    if (records.length > 0) {
      const latestRecord = records[0];
      console.log('Latest record date:', latestRecord.date);
      console.log('Student count:', latestRecord.students.length);
      
      if (latestRecord.students.length > 0) {
        const firstStudent = latestRecord.students[0];
        console.log('First student ID type:', typeof firstStudent.id);
        console.log('First student ID value:', firstStudent.id);
      }
    }
    
    // Step 3: Test API with a known good payload
    console.log('\n3. Testing API with known good payload:');
    const testData = {
      date: new Date().toISOString().split('T')[0],
      students: [
        {
          id: "67c5e412a9092abc43bd8bf5", // Example MongoDB ObjectID
          name: "Test Student 1",
          present: true
        }
      ]
    };
    
    console.log('Sending test data:', JSON.stringify(testData, null, 2));
    
    try {
      const response = await fetch('http://localhost:5000/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });
      
      console.log('Response status:', response.status, response.statusText);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      try {
        const data = JSON.parse(responseText);
        console.log('API test result:', data.success ? 'SUCCESS' : 'FAILED');
        if (!data.success) {
          console.log('Error message:', data.message);
        }
      } catch (e) {
        console.error('Could not parse response as JSON:', e);
      }
    } catch (error) {
      console.error('API test failed with error:', error);
    }
    
    // Step 4: Create a test record directly in the database
    console.log('\n4. Creating test record directly in database:');
    try {
      const directTestData = {
        date: new Date().toISOString().split('T')[0] + '-direct',
        students: [
          {
            id: "67c5e412a9092abc43bd8bf5", // String ID
            name: "Direct Test Student",
            present: true
          }
        ]
      };
      
      const newAttendance = new Attendance(directTestData);
      await newAttendance.save();
      console.log('Direct database insert: SUCCESS');
      
      // Verify the record was saved correctly
      const savedRecord = await Attendance.findOne({ date: directTestData.date });
      if (savedRecord) {
        console.log('Retrieved saved record successfully');
        console.log('Saved student ID type:', typeof savedRecord.students[0].id);
        console.log('Saved student ID value:', savedRecord.students[0].id);
      } else {
        console.log('Failed to retrieve saved record');
      }
      
      // Clean up the test record
      await Attendance.deleteOne({ date: directTestData.date });
      console.log('Test record cleaned up');
    } catch (error) {
      console.error('Direct database test failed:', error);
    }
    
    console.log('\n=== DEBUG COMPLETE ===');
  } catch (error) {
    console.error('Debug script failed:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the debug script
connectDB()
  .then(() => debugAttendance())
  .catch(error => {
    console.error('Error in debug script:', error);
    process.exit(1);
  }); 