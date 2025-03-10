import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define the Lesson model
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

// Sample lessons data
const sampleLessons = [
  {
    title: '1 Class - Introduction to Mathematics',
    description: 'Basic concepts of mathematics including numbers, operations, and problem-solving techniques.'
  },
  {
    title: '2 Class - Language Arts Fundamentals',
    description: 'Introduction to reading, writing, and basic grammar concepts for young learners.'
  },
  {
    title: '3 Class - Science Exploration',
    description: 'Exploring the natural world through hands-on experiments and observations.'
  },
  {
    title: '4 Class - Social Studies Basics',
    description: 'Learning about communities, history, and geography in an engaging way.'
  },
  {
    title: '5 Class - Art and Creativity',
    description: 'Developing artistic skills and creative expression through various mediums.'
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
    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');
    
    // Insert sample lessons
    const insertedLessons = await Lesson.insertMany(sampleLessons);
    console.log(`Added ${insertedLessons.length} sample lessons`);
    
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