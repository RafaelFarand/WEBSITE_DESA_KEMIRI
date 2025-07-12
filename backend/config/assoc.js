import db from "./database.js";
import PendudukModel from "../models/pendudukModel.js";
import StrukturalModel from "../models/strukturalModel.js";
import PotensiWisataModel from "../models/potensiWisataModel.js";

const association = async () => {
    try {
        await db.sync({ alter: false });
        console.log("✅ All models synced");

        // Insert default data penduduk kalau kosong
        const pendudukCount = await PendudukModel.count();
        if (pendudukCount === 0) {
            const defaultLaki = 569;
            const defaultPerempuan = 400;
            const total = defaultLaki + defaultPerempuan;

            await PendudukModel.create({
                jumlah_kk: 108,
                jumlah_laki: defaultLaki,
                jumlah_perempuan: defaultPerempuan,
                data_penduduk: total
            });
            console.log("🟢 Default data penduduk inserted");
        }

        // Insert default struktural desa kalau kosong
        const strukturalCount = await StrukturalModel.count();
        if (strukturalCount === 0) {
            await StrukturalModel.bulkCreate([
                {
                    jabatan: "Kepala Desa",
                    nama: "I Made Suta",
                    image_url: "https://mediaindonesia.gumlet.io/news/2024/05/1f31726c67ea9f66fe3152c2b0ac2dce.jpg?w=376&dpr=2.6",
                    role: 1,
                },
                {
                    jabatan: "Sekretaris Desa",
                    nama: "Ni Kadek Rini",
                    image_url: "https://mediaindonesia.gumlet.io/news/2024/05/1f31726c67ea9f66fe3152c2b0ac2dce.jpg?w=376&dpr=2.6",
                    role: 0,
                },
                {
                    jabatan: "Bendahara",
                    nama: "I Wayan Agus",
                    image_url: "https://mediaindonesia.gumlet.io/news/2024/05/1f31726c67ea9f66fe3152c2b0ac2dce.jpg?w=376&dpr=2.6",
                    role: 0,
                }
            ]);
            console.log("🟢 Default struktural desa inserted");
        }
        
        // Insert default potensi wisata kalau kosong
        const wisataCount = await PotensiWisataModel.count();
        if (wisataCount === 0) {
            await PotensiWisataModel.create({
                judul: "Air Terjun Kemiri",
                deskripsi: "Salah satu destinasi wisata alam tersembunyi di Desa Kemiri, dikelilingi oleh hutan lebat dan udara sejuk.",
                image_url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                image_public_id: "sample" // opsional dummy
            });
            console.log("🟢 Default potensi wisata inserted");
        }

    } catch (err) {
        console.error("Association error:", err);
    }
};

export default association;
