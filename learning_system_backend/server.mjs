import express from 'express';
import connectDB from './config/dtabase.js';
import dotenv from 'dotenv';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import announcementRoute from "./routes/AnnouncementRouter.js"



dotenv.config();
connectDB()


const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use('/api/v1/announcements', announcementRoute);

app.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello  world");
    
});
app.use(errorHandler); // Global error handler
app.listen(5000,()=> console.log("server is running"));
