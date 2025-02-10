import express from 'express';
import connectDB from './config/db.mjs'

const server = express();

connectDB();

server.get("/", (req, res) => {
  res.send("MongoDB Connected with Mongoose!");
});

server.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello world");
    
});


server.listen(5000,()=> console.log("server is running"));