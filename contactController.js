import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

// Create contact (public)
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });

    // Optionally send an email notification to admin if SMTP configured
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_NOTIFY_EMAIL
    ) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"HealthTrack Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_NOTIFY_EMAIL,
          subject: `New Contact: ${subject || "No subject"}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        });
      } catch (mailErr) {
        console.error("Contact email error:", mailErr);
      }
    }

    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get contact messages (protected admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark read or update
export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    Object.assign(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    await contact.deleteOne(); // ✅ use deleteOne() instead of remove() (deprecated)
    res.json({ message: "Contact removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
