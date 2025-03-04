import express from 'express';
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
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

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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