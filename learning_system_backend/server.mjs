import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
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



import errorHandler from "./middleware/errorMiddleware.js";
import lessonsRoutes from './routes/lessonsRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



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
console.log('Setting up routes...');
app.use("/api/auth", authRoutes);
console.log('Auth routes set up');
app.use('/api/lessons', lessonsRoutes);
console.log('Lessons routes set up');
app.use('/api/attendance', attendanceRoutes);
console.log('Attendance routes set up');
app.use('/api/users', userRoutes);
console.log('User routes set up');

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
// Test route
app.get("/test", (req, res) => {
  console.log("Test route accessed");
  res.send("Hello world");
});

// Debug route to check all registered routes
app.get('/debug/routes', (req, res) => {
  const routes = [];
  
  app._router.stack.forEach(middleware => {
    if(middleware.route) { // routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if(middleware.name === 'router') { // router middleware
      middleware.handle.stack.forEach(handler => {
        if(handler.route) {
          const path = handler.route.path;
          const baseUrl = middleware.regexp.toString()
            .replace('\\^', '')
            .replace('\\/?(?=\\/|$)', '')
            .replace(/\\\//g, '/')
            .replace(/\(\?:\(\[\^\\\/\]\+\?\)\)/g, ':id');
          
          routes.push({
            path: baseUrl + path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  
  res.json(routes);
});

// Catch-all route for undefined routes
app.use('*', (req, res) => {
  console.log(`Route not found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
try {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- GET /test');
    console.log('- GET /debug/routes');
    console.log('- /api/auth/*');
    console.log('- /api/lessons/*');
    console.log('- /api/attendance/*');
    console.log('- /api/users/*');
  });
} catch (error) {
  console.error(`Error starting server: ${error.message}`);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  }
}
