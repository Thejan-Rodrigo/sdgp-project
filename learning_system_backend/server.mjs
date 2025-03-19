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




dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());



app.use("/api/admin", adminRoutes);
app.use("/api/schools", schoolRoutes);

app.use("/api/learning", learningRoutes)


app.use("/api/auth", authRoutes);

app.use('/api/v1/announcements', announcementRoute);

app.get("/test",(req,res)=>{
    console.log(req);
    res.send("Hello  world");
    
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

app.listen(5000,()=> console.log("server is running"));
