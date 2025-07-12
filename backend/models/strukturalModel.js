import { DataTypes } from "sequelize";
import db from "../config/database.js";

const StrukturalDesa = db.define("StrukturalDesa", {
  jabatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    defaultValue: "https://mediaindonesia.gumlet.io/news/2024/05/1f31726c67ea9f66fe3152c2b0ac2dce.jpg?w=376&dpr=2.6",
  },
  image_public_id: { // ← Tambahan
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "struktural_desa",
  timestamps: true,
});

export default StrukturalDesa;