import Blog from "../models/Blog.js";
import mongoose from "mongoose";

// Create blog (protected)
export const createBlog = async (req, res) => {
  try {
    const { title, slug, excerpt, content, tags = [], coverImage = "", published = true } = req.body;
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(400).json({ message: "Slug already used" });

    const blog = await Blog.create({
      title, slug, excerpt, content, tags, coverImage, published
    });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get public blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).populate("author", "name");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get blog by slug or id
export const getBlog = async (req, res) => {
  try {
    const q = req.params.slugOrId;
    let blog;

    if (mongoose.Types.ObjectId.isValid(q)) {
      blog = await Blog.findById(q).populate("author", "name");
    } else {
      blog = await Blog.findOne({ slug: q }).populate("author", "name");
    }

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Update blog
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    Object.assign(blog, req.body);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    await blog.remove();
    res.json({ message: "Blog removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};