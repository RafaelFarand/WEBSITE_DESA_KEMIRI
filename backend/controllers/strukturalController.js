import StrukturalDesa from "../models/strukturalModel.js";
import cloudinary from "../config/cloudinary.js";
// GET semua struktural
export const getAllStruktural = async (req, res) => {
  try {
    const data = await StrukturalDesa.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET struktural by ID
export const getStrukturalById = async (req, res) => {
  try {
    const data = await StrukturalDesa.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST buat data struktural baru
export const createStruktural = async (req, res) => {
  try {
    const { jabatan, nama } = req.body;
    const image_url = req.file?.path;
    const image_public_id = req.file?.filename;

    if (!image_url) return res.status(400).json({ message: "Image tidak ditemukan" });

    const newData = await StrukturalDesa.create({
      jabatan,
      nama,
      image_url,
      image_public_id,
      // role otomatis default 0
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// PUT update data struktural
export const updateStruktural = async (req, res) => {
  try {
    const { jabatan, nama } = req.body;
    const data = await StrukturalDesa.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    let image_url = data.image_url;
    let image_public_id = data.image_public_id;

    if (req.file) {
      // 1. Hapus image lama di Cloudinary (jika ada)
      if (image_public_id) {
        await cloudinary.uploader.destroy(image_public_id);
      }

      // 2. Update dengan image baru
      image_url = req.file.path;
      image_public_id = req.file.filename; // dapet dari multer-storage-cloudinary
    }

    await data.update({
      jabatan,
      nama,
      // role: parseInt(role),
      image_url,
      image_public_id,
    });

    res.json({ message: "Data berhasil diperbarui", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE data struktural
export const deleteStruktural = async (req, res) => {
  try {
    const data = await StrukturalDesa.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    // Hapus image dari Cloudinary kalau ada public_id-nya
    if (data.image_public_id) {
      await cloudinary.uploader.destroy(data.image_public_id);
    }

    await data.destroy();
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

