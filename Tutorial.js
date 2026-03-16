import mongoose from "mongoose";

const tutorialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, 
  description: { type: String },
  content: { type: String }, 
  videoUrl: { type: String, default: "" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tags: [String],
  published: { type: Boolean, default: true },
}, { timestamps: true });

const Tutorial = mongoose.model("Tutorial", tutorialSchema);
export default Tutorial;