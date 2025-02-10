import mongoose from 'mongoose'

const mongoURI = "mongodb+srv://thejanpandula2003:NNsYMLEjHz9p9paI@kinderzone.nt23j.mongodb.net/?retryWrites=true&w=majority&appName=KinderZone"; // Replace with your actual connection string

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;