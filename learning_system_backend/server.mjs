import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js"; // Use curly braces for named export
import meetingRoutes from "./api/router/meetingRoutes.mjs";
import lessonsRoutes from "./routes/lessonsRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import http from "http";
import { Server } from "socket.io";
import ChatService from "./services/chatService.js";
import { Message } from "./models/Message.js"; // ✅ Correct import
import chatbotRouter from "./routes/chatbotRouter.js";
// import errorHandler from "./middleware/errorMiddleware.js";
import announcementRoute from "./routes/AnnouncementRouter.js"
import learningRoutes from "./routes/learningRoutes.js"
import schoolRoutes from "./routes/schoolRoutes.js";
//import logRequest from './utils/logger.js'; // Adjust the path to where you defined logRequest
// import { getStudentProfile, getStudentProgress } from "./controllers/studentController.js";
// import { getAttendance } from "./controllers/studentAttendace.js"
// import { getAuthUrl, handleOAuthCallback, generateMeetingLink } from './api/router/meeting.mjs';
// import meetingRoutes from "./api/router/meetingRoutes.mjs";
// import lessonsRoutes from "./routes/lessonsRoutes.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
// import studentRoutes from "./routes/chatRoutes.js";
// import TeacherRoutes from "./routes/chatRoutes.js"; // ✅ Import teacher routes
//import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB




const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/chatbot", chatbotRouter);
app.use('/api/v1/announcements', announcementRoute);
app.use('/api/learning', learningRoutes)
app.use('/api/schools', schoolRoutes)
//app.use("/api/students", studentRoutes);
app.use("/api", meetingRoutes);
//app.use("/api/auth", authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/lessons', lessonsRoutes);

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

app.get("/", (req, res) => {
  res.send("MongoDB Connected with Mongoose!");
});

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

  socket.on("join", (userId) => {
    socket.join(userId); // Join room with user's ID
    console.log(`User ${userId} joined their room`);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const savedMessage = await ChatService.saveMessage(data);
      console.log("Message saved:", savedMessage);

      // Emit to receiver's room
      io.to(data.receiverId).emit("receiveMessage", savedMessage);

      // Optionally echo back to sender (if sender wants real-time feedback)
      io.to(data.senderId).emit("receiveMessage", savedMessage);
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

//app.use("/attendance", attendanceRoutes);
// app.use("/progress", progressRoutes);
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
