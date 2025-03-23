import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.js";
// import errorHandler from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import announcementRoute from "./routes/AnnouncementRouter.js"
import learningRoutes from "./routes/learningRoutes.js"

import schoolRoutes from "./routes/schoolRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js"; // Use curly braces for named export
import logRequest from './utils/logger.js'; // Adjust the path to where you defined logRequest
import studentRoutes from "./routes/studentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
// import { getStudentProfile, getStudentProgress } from "./controllers/studentController.js";
// import { getAttendance } from "./controllers/studentAttendace.js"
// import { getAuthUrl, handleOAuthCallback, generateMeetingLink } from './api/router/meeting.mjs';
import meetingRoutes from "./api/router/meetingRoutes.mjs";

import lessonsRoutes from "./routes/lessonsRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
// import studentRoutes from "./routes/chatRoutes.js";
// import TeacherRoutes from "./routes/chatRoutes.js"; // ✅ Import teacher routes
//import errorHandler from "./middleware/errorMiddleware.js";
import http from "http";
import { Server } from "socket.io";
import ChatService from "./services/chatService.js";
import { Message } from "./models/Message.js"; // ✅ Correct import
import chatbotRouter from "./routes/chatbotRouter.js";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

import chatbotRouter from "./routes/chatbotRouter.js";


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

    const message = await Message.findById(messageId); // ✅ Fixed reference

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (message.senderId.toString() !== userId) {
      return res.status(403).json({ error: "You can only delete your own messages" });
    }

    await Message.findByIdAndDelete(messageId);
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
app.get("/", (req, res) => {
res.send("Hello, World!");
});

app.get("/", (req, res) => {
res.send("MongoDB Connected with Mongoose!");
});

app.use("/api/students", studentRoutes);
//app.use("/attendance", attendanceRoutes);
// app.use("/progress", progressRoutes);

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/chatbot", chatbotRouter);

app.get("/", (req, res) => {
  res.send("MongoDB Connected with Mongoose!");
});

app.use("/api", meetingRoutes);
app.use("/api/auth", authRoutes);

//import lessons and attendence routes here
app.use('/api/attendance', attendanceRoutes);
app.use('/api/lessons', lessonsRoutes);

// Route to initiate OAuth2 flow
// app.get('/auth', (req, res) => {
//   const authUrl = getAuthUrl();
//   res.redirect(authUrl);
// });

// Callback route to handle OAuth2 response
// app.get('/oauth2callback', async (req, res) => {
//   const { code } = req.query;

//   try {
//     await handleOAuthCallback(code);
//     res.send('Authentication successful! You can now generate a Google Meet link.');
//   } catch (error) {
//     console.error('Error during OAuth callback:', error);
//     res.status(500).send('Error during authentication');
//   }
// });

// Route to generate Google Meet link after successful authentication
// app.get('/generateMeetingLink', async (req, res) => {
//   try {
//     const meetingLink = await generateMeetingLink();
//     res.json({ meetingLink });
//   } catch (error) {
//     console.error('Error creating Google Meet:', error);
//     res.status(500).json({ error: 'Failed to generate meeting link.' });
//   }
// });

// ✅ Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
