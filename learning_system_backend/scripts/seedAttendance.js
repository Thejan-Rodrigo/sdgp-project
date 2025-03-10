import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the Attendance model
const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  students: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      present: { type: Boolean, default: false }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

// Sample attendance data
const sampleAttendance = [
  {
    date: '202X-XX-XX',
    students: [
      { id: 1, name: '1.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 2, name: '2.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 3, name: '3.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 4, name: '4.xxxxxxx xxxxxxxx xxxxxxx', present: false },
      { id: 5, name: '5.xxxxxxx xxxxxxxx xxxxxxx', present: false }
    ]
  },
  {
    date: '202X-XX-YY',
    students: [
      { id: 1, name: '1.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 2, name: '2.xxxxxxx xxxxxxxx xxxxxxx', present: false },
      { id: 3, name: '3.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 4, name: '4.xxxxxxx xxxxxxxx xxxxxxx', present: true },
      { id: 5, name: '5.xxxxxxx xxxxxxxx xxxxxxx', present: true }
    ]
  }
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learning_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB Connected');
  
  try {
    // Clear existing attendance records
    await Attendance.deleteMany({});
    console.log('Cleared existing attendance records');
    
    // Insert sample attendance records
    const insertedAttendance = await Attendance.insertMany(sampleAttendance);
    console.log(`Added ${insertedAttendance.length} sample attendance records`);
    
    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
})
.catch(err => {
  console.error('MongoDB connection error:', err);
}); 