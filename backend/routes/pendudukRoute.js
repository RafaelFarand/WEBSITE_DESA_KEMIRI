import express from "express";
import { getPenduduk, updatePenduduk } from "../controllers/pendudukController.js";

const router = express.Router();

router.get("/", getPenduduk);
router.put("/", updatePenduduk);

export default router;
