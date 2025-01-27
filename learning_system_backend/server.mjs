import express from 'express';

const server = express();

server.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello world");
    
});

server.listen(3000,()=> console.log("server is running"));