import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello  world");
    
});

app.use(errorHandler); // Global error handler

app.listen(5000,()=> console.log("server is running"));
