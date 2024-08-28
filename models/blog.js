import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Define the schema
const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    blogText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Build the model
const Blog = model("Blog", blogSchema);

export default Blog;