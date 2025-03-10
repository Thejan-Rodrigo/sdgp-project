import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.js";
// import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js"; // Use curly braces for named export
import logRequest from './utils/logger.js'; // Adjust the path to where you defined logRequest
import studentRoutes from "./routes/studentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/admin", adminRoutes);
app.use("/api/schools", schoolRoutes);

app.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello world");
    
});


// Routes
app.use("/api/students", studentRoutes);
app.use("/api/progress", progressRoutes);



app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
