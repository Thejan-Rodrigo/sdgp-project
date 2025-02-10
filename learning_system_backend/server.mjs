import connectDB from './config/db.mjs'

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
