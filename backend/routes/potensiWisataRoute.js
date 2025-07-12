import express from "express";
import upload from "../middlewares/uploadPotensiWisataImage.js";
import {
  getAllPotensi,
  getPotensiById,
  createPotensi,
  updatePotensi,
  deletePotensi,
} from "../controllers/potensiWisataController.js";

const router = express.Router();

router.get("/", getAllPotensi);
router.get("/:id", getPotensiById);
router.post("/", upload.single("image"), createPotensi);
router.put("/:id", upload.single("image"), updatePotensi);
router.delete("/:id", deletePotensi);

export default router;
