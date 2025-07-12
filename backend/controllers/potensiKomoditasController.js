import PotensiKomoditas from "../models/potensiKomoditasModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllPotensiKomoditas = async (req, res) => {
  try {
    const data = await PotensiKomoditas.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPotensiKomoditasById = async (req, res) => {
  try {
    const data = await PotensiKomoditas.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPotensiKomoditas = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const image = req.file;
    if (!image) return res.status(400).json({ message: "Gambar wajib diupload" });

    const upload = await cloudinary.uploader.upload(image.path, {
      folder: "desa_kemiri/potensi_komoditas"
    });

    const newData = await PotensiKomoditas.create({
      judul,
      deskripsi,
      image_url: upload.secure_url,
      image_public_id: upload.public_id
    });

    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePotensiKomoditas = async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const data = await PotensiKomoditas.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });

    if (req.file) {
      if (data.image_public_id) {
        await cloudinary.uploader.destroy(data.image_public_id);
      }
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "desa_kemiri/potensi_komoditas"
      });
      await data.update({
        image_url: upload.secure_url,
        image_public_id: upload.public_id
      });
    }

    await data.update({ judul, deskripsi });
    res.json({ message: "Data berhasil diperbarui", data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePotensiKomoditas = async (req, res) => {
  try {
    const data = await PotensiKomoditas.findByPk(req.params.id);
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
