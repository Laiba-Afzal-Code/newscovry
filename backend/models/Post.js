import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  author: { type: String, required: true },
  image: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", PostSchema);
