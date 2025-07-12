import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PotensiKomoditas = db.define("PotensiKomoditas", {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_public_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "potensi_komoditas",
  timestamps: true,
});

export default PotensiKomoditas;
