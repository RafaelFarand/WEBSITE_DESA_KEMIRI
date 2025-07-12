import express from "express";
import upload from "../middlewares/uploadStrukturalImage.js";
import {
  getAllStruktural,
  getStrukturalById,
  createStruktural,
  updateStruktural,
  deleteStruktural
} from "../controllers/strukturalController.js";

const router = express.Router();

router.get("/", getAllStruktural);
router.get("/:id", getStrukturalById);
router.post("/", upload.single("image"), createStruktural); // ← form-data: image
router.put("/:id", upload.single("image"), updateStruktural);
router.put("/:id", updateStruktural);
router.delete("/:id", deleteStruktural);

export default router;
