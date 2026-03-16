import Tutorial from "../models/Tutorial.js";
import mongoose from "mongoose";

// Create tutorial (public, with default author if no user)
export const createTutorial = async (req, res) => {
  try {
    const { title, slug, description, content, tags = [], published = true } = req.body;

    const exists = await Tutorial.findOne({ slug });
    if (exists) return res.status(400).json({ message: "Slug already used" });

    const tutorial = await Tutorial.create({
      title,
      slug,
      description,
      content,
      videoUrl,
      tags,
      published,
      author: req.user?._id || null, // fallback if no auth
    });

    res.status(201).json(tutorial);
  } catch (err) {
    console.error("Error creating tutorial:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tutorials (public)
export const getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().populate("author", "name email");
    res.json(tutorials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tutorial by slug or id
export const getTutorial = async (req, res) => {
  try {
    const query = req.params.slugOrId;
    let tutorial;

    if (mongoose.Types.ObjectId.isValid(query)) {
      tutorial = await Tutorial.findById(query).populate("author", "name email");
    } else {
      tutorial = await Tutorial.findOne({ slug: query }).populate("author", "name email");
    }

    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });
    res.json(tutorial);
  } catch (err) {
    console.error("Error fetching tutorial:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update tutorial
export const updateTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

    Object.assign(tutorial, req.body);
    await tutorial.save();
    res.json(tutorial);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete tutorial
export const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    if (!tutorial) return res.status(404).json({ message: "Tutorial not found" });

    await tutorial.deleteOne(); // modern replacement for remove()
    res.json({ message: "Tutorial removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};