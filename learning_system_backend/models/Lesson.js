import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  grade: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image:{ type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  
},{ timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson; 