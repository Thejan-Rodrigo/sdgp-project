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

app.use("/api/admin", adminRoutes);
app.use("/api/schools", schoolRoutes);

app.use("/api/learning", learningRoutes)


app.use("/api/auth", authRoutes);

app.use('/api/v1/announcements', announcementRoute);

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

app.use(errorHandler); // Global error handler

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)); // ✅ FIXED
