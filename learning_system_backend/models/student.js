const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  status: { type: String, required: true },
  lastUpdate: { type: String, required: true },
  progressHistory: [
    {
      date: { type: String, required: true },
      type: { type: String, required: true },
      message: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model('Student', studentSchema);