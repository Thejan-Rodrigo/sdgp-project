import express from 'express';
import connectDB from './config/dtabase.js';
import dotenv from 'dotenv';

dotenv.config();


const server = express();

connectDB()

server.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello  world");
    
});

server.listen(5000,()=> console.log("server is running"));