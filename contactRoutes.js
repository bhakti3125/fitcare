// backend/routes/contactRoutes.js
import express from "express";
import { createContact, getContacts, updateContact, deleteContact } from "../controllers/contactController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", createContact); // public
router.get("/", verifyToken, getContacts); // admin
router.put("/:id", verifyToken, updateContact);
router.delete("/:id", verifyToken, deleteContact);

export default router;