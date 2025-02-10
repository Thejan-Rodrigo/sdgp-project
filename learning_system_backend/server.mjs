import express from 'express';
import { getAuthUrl, handleOAuthCallback, generateMeetingLink } from './api/router/meeting.mjs';
import connectDB from './config/db.mjs'// Import database connection
import meetingRoutes from "./api/router/meetingRoutes.mjs";

// Create express server
const server = express();

// Middleware to parse JSON
server.use(express.json());

connectDB();

server.get("/", (req, res) => {
  res.send("MongoDB Connected with Mongoose!");
});

server.use("/api", meetingRoutes);

// Route to initiate OAuth2 flow
server.get('/auth', (req, res) => {
  const authUrl = getAuthUrl();
  res.redirect(authUrl);
});

// Callback route to handle OAuth2 response
server.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;

  try {
    await handleOAuthCallback(code);
    res.send('Authentication successful! You can now generate a Google Meet link.');
  } catch (error) {
    console.error('Error during OAuth callback:', error);
    res.status(500).send('Error during authentication');
  }
});

// Route to generate Google Meet link after successful authentication
server.get('/generateMeetingLink', async (req, res) => {
  try {
    const meetingLink = await generateMeetingLink();
    res.json({ meetingLink });
  } catch (error) {
    console.error('Error creating Google Meet:', error);
    res.status(500).json({ error: 'Failed to generate meeting link.' });
  }
});

// Start server
server.listen(3000, () => {
  console.log('Server is running');
});
