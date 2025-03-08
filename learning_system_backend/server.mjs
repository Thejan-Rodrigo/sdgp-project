import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import http from "http";
import { Server } from "socket.io";
import chatRoutes from "./routes/chatRoutes.js";
import ChatService from "./services/chatService.js";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.get("/test",(req,res)=>{
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
})})

app.use("/api/chat", chatRoutes);

const server = http.createServer(app); // ✅ Fix: Ensure WebSocket is on same server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change to match frontend
    methods: ["GET", "POST"],
  },
});

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

// Test endpoint
app.get("/test", (req, res) => {
  res.send("Hello world");
});

app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)); // ✅ FIXED
