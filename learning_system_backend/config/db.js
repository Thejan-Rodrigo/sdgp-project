import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/learning_system', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Log more details about the error
    if (error.name === 'MongoParseError') {
      console.error('Invalid MongoDB connection string');
    } else if (error.name === 'MongoNetworkError') {
      console.error('MongoDB network error - check if MongoDB is running');
    }
    
    // Don't exit the process, just log the error
    console.error('Continuing without MongoDB connection');
  }
};

export default connectDB;
