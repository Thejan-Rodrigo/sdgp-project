import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { 
    type: String, 
    required: true 
  },
  students: [
    {
      id: { 
        type: String, 
        required: true 
      },
      name: { 
        type: String, 
        required: true 
      },
      present: { 
        type: Boolean, 
        default: false 
      }
    }
  ],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
attendanceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance; 