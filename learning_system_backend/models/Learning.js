import mongoose from 'mongoose';

const learningSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true }, 
  audience: { type: String, enum: ['teacher', 'parent'], required: true }, 
}, { timestamps: true });

const Learning = mongoose.model('Learning', learningSchema);

export default Learning;
