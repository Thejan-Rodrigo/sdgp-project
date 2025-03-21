import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { readFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';

// OAuth 2.0 credentials
// const credentials = JSON.parse(readFileSync('./config/credentials.json', 'utf8'));
// const { client_id, client_secret, redirect_uris } = credentials.web;
// const oauth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);

// Scopes required for Google Calendar and Meet
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

// Function to get the authentication URL
export const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};

// Function to handle OAuth2 callback and set credentials
// export const handleOAuthCallback = async (code) => {
//   if (!code) {
//     throw new Error('Authorization code is missing.');
//   }

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);
//     console.log('Tokens received:', tokens);
//     // Return tokens for later use or store securely
//     return tokens;
//   } catch (error) {
//     console.error('Error during OAuth callback:', error);
//     throw new Error('Error during authentication');
//   }
// };

// Function to generate the Google Meet link
export const generateMeetingLink = async () => {
  if (!oauth2Client.credentials) {
    throw new Error('You must authenticate first.');
  }

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Set a hardcoded date-time in Sri Lankan Time (Asia/Colombo)
  const sriLankanTime = moment.tz('2025-02-01 10:00', 'YYYY-MM-DD HH:mm', 'Asia/Colombo');
  
  const startTime = sriLankanTime.toDate();  // Convert to native Date object
  const endTime = sriLankanTime.add(1, 'hour').toDate();  // Set end time 1 hour after start time

  // Create Google Calendar event with Google Meet link
  const event = {
    summary: 'Meeting Scheduled from Node.js',
    description: 'This is a test Google Meet meeting created using Node.js.',
    start: {
      dateTime: startTime,
      timeZone: 'Asia/Colombo',  // Set the time zone to Sri Lanka's time zone
    },
    end: {
      dateTime: endTime,
      timeZone: 'Asia/Colombo',  // Set the time zone to Sri Lanka's time zone
    },
    conferenceData: {
      createRequest: {
        requestId: uuidv4(), // Unique request ID
        conferenceSolutionKey: {
          type: 'hangoutsMeet',
        },
      },
    },
  };

  try {
    // Create the event
    const response = await calendar.events.insert({
      calendarId: 'primary',  // Use 'primary' or a specific calendar ID
      resource: event,
      conferenceDataVersion: 1,
    });

    // Return the Google Meet link
    return response.data.hangoutLink;
  } catch (error) {
    console.error('Error creating Google Meet:', error);
    throw new Error('Failed to generate meeting link.');
  }
};
