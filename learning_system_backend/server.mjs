import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import http from "http";
import { Server } from "socket.io";
import ChatService from "./services/chatService.js";
import MessageModel from "./models/Message.js"; // ✅ Import Message Model

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);

// Create HTTP Server
const server = http.createServer(app);

// WebSocket Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // ✅ Ensure frontend URL is correct
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const savedMessage = await ChatService.saveMessage(data);
      console.log("Message saved:", savedMessage);

      // Emit message to recipient
      socket.to(data.receiverId).emit("receiveMessage", savedMessage);
      socket.emit("receiveMessage", savedMessage); // Send back to sender
    } catch (error) {
      console.error("Message saving error:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Fix: Properly Define the Delete Route
app.delete("/api/chat/delete/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const { userId } = req.body; // Assuming sender ID is sent in the request body

    const message = await MessageModel.findById(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ error: "You can only delete your own messages" });
    }

    await MessageModel.findByIdAndDelete(messageId);
    io.emit("messageDeleted", messageId);
    res.status(200).json({ success: true, messageId });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message" });
  }
});


// ✅ Test Endpoint
app.get("/test", (req, res) => {
  res.send("Hello world");
});

// ✅ Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
