import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import ChatService from "./services/chatService.js";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
})


app.use(cors());
app.use(express.json());
app.use("/api/chat", chatRoutes);

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  
    socket.on("message", async (data) => {
      try {
        const savedMessage = await ChatService.saveMessage(data);
        io.emit("message", savedMessage); // Broadcast to all users
      } catch (error) {
        console.error("Message saving error:", error);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

app.get("/test", (req, res) => {
    console.log(req);
    res.send("Hello world");

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));