// const mongoose = require("mongoose");
import mongoose from "mongoose";
const tiktokSchema = mongoose.Schema({
  url: String,
  channel: String,
  song: String,
  likes: String,
  messages: String,
  description: String,
  shares: String,
});
// module.exports = mongoose.model("tiktokVideos", tiktokSchema);
export default mongoose.model("tiktokVideos", tiktokSchema);
