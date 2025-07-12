import PotensiWisata from "../models/potensiWisataModel.js";
import cloudinary from "../config/cloudinary.js";

// GET all
export const getAllPotensi = async (req, res) => {
    try {
        const data = await PotensiWisata.findAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET by ID
export const getPotensiById = async (req, res) => {
    try {
        const data = await PotensiWisata.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// CREATE
export const createPotensi = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        if (!req.file) return res.status(400).json({ message: "Gambar wajib diupload" });
        let image_url = null;
        let image_public_id = null;

        if (req.file && req.file.path) {
            image_url = req.file.path;
            image_public_id = req.file.filename;
        }

        const newData = await PotensiWisata.create({ judul, deskripsi, image_url, image_public_id });
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// UPDATE
export const updatePotensi = async (req, res) => {
    try {
        const { judul, deskripsi } = req.body;
        const data = await PotensiWisata.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

        // Hapus gambar lama jika ada gambar baru
        if (req.file && data.image_public_id) {
            await cloudinary.uploader.destroy(data.image_public_id);
        }

        const image_url = req.file ? req.file.path : data.image_url;
        const image_public_id = req.file ? req.file.filename : data.image_public_id;

        await data.update({ judul, deskripsi, image_url, image_public_id });
        res.json({ message: "Data berhasil diperbarui", data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE
export const deletePotensi = async (req, res) => {
    try {
        const data = await PotensiWisata.findByPk(req.params.id);
        if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

        if (data.image_public_id) {
            await cloudinary.uploader.destroy(data.image_public_id);
        }

        await data.destroy();
        res.json({ message: "Data berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
