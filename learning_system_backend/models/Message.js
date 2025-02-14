import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // user ID or name
    receiver: { type: String, required: true }, // recipient ID or group
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);