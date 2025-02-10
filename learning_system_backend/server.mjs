import connectDB from './config/db.mjs'

import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/schools", schoolRoutes);

app.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello world");
    
});





connectDB();

app.get("/", (req, res) => {
  res.send("MongoDB Connected with Mongoose!");
});


let children = [
    { id: "1", name: "John Doe", address: "123 Street", progress: "" },
    { id: "2", name: "Jane Smith", address: "456 Avenue", progress: "" }
];

app.get('/api/children', (req, res) => res.json(children));
app.post('/api/children', (req, res) => {
    const newChild = { id: Date.now().toString(), ...req.body };
    children.push(newChild);
    res.status(201).json(newChild);
});

app.put('/api/children/:id', (req, res) => {
    const { id } = req.params;
    const { progress } = req.body;
    const child = children.find(c => c.id === id);

    if (child) {
        child.progress = progress;
        res.json({ message: "Progress updated", child });
    } else {
        res.status(404).json({ message: "Child not found" });
    }
});


app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
