import { DataTypes } from "sequelize";
import db from "../config/database.js";

const PotensiWisata = db.define("PotensiWisata", {
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
    allowNull: true,
    
  },
  image_public_id: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: "potensi_wisata",
  timestamps: true,
});

export default PotensiWisata;
