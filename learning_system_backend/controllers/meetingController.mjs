import Meeting from "../models/Meeting.mjs";

// Add a new meeting
export const addMeeting = async (req, res) => {
  try {
    const { name, description, time, link, schoolId } = req.body;

    // Create a new meeting with schoolId
    const meeting = new Meeting({ name, description, time, link, schoolId });

    console.log("Saving data");
    // Save to DB
    await meeting.save();

    console.log("Data saved");
    // Return all meetings
    const allMeetings = await Meeting.find();
    res.status(201).json(allMeetings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all meetings
export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.status(200).json(meetings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the meeting
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    // Return updated list of meetings
    const allMeetings = await Meeting.find();
    res.status(200).json(allMeetings);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};