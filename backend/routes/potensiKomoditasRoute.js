import express from "express";
import upload from "../middlewares/uploadKomoditasImage.js";
import {
  getAllPotensiKomoditas,
  getPotensiKomoditasById,
  createPotensiKomoditas,
  updatePotensiKomoditas,
  deletePotensiKomoditas
} from "../controllers/potensiKomoditasController.js";

const router = express.Router();

router.get("/", getAllPotensiKomoditas);
router.get("/:id", getPotensiKomoditasById);
router.post("/", upload.single("image"), createPotensiKomoditas);
router.put("/:id", upload.single("image"), updatePotensiKomoditas);
router.delete("/:id", deletePotensiKomoditas);

export default router;
