import express from "express";
import {
  createTutorial,
  getTutorials,
  getTutorial,
  updateTutorial,
  deleteTutorial,
} from "../controllers/tutorialController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getTutorials); // public
router.get("/:slugOrId", getTutorial); // public

// Protected operations (admin/author)
router.post("/", verifyToken, createTutorial);
router.put("/:id", verifyToken, updateTutorial);
router.delete("/:id", verifyToken, deleteTutorial);

export default router;