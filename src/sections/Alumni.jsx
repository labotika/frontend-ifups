import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../constants/endpoints";
import { ROUTES } from "../constants/routes";
import { PLACEHOLDERS } from "../constants/placeholders";
import { fadeUp, gridContainer, cardItem } from "../constants/animations";
import { normalizeListResponse } from "../utils/normalizeResponse";
import { handleImageError } from "../utils/imageUrl";

const Alumni = () => {
  const { data: responseData, loading, error } = useFetch(ENDPOINTS.PRESTASI);

  const prestasiList = normalizeListResponse(responseData);
  const featuredPrestasi = prestasiList.slice(0, 4);

  if (loading) {
    return (
      <section id="alumni" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section id="alumni" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ASISTEN LAB INFORMATIKA
          </h2>
          <p className="text-xl text-gray-600">Kebanggaan Prodi Informatika</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-14"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredPrestasi.map((item) => (
            <motion.div key={item.id} variants={cardItem}>
              <Link
                to={`${ROUTES.PRESTASI}/${item.id}`}
                className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl block h-full max-w-xs mx-auto sm:max-w-none w-full"
              >
                <div className="relative overflow-hidden h-full">
                  <img
                    src={item.foto_url || PLACEHOLDERS.MAHASISWA}
                    alt={`Foto ${item.nama}`}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => handleImageError(e, PLACEHOLDERS.MAHASISWA)}
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    <h3 className="text-base font-bold text-primary leading-snug mb-1 drop-shadow-sm line-clamp-1">
                      {item.nama}
                    </h3>
                    <p className="text-xs text-blue-900 font-medium leading-relaxed opacity-90 line-clamp-2">
                      {item.kejuaraan || "Prestasi Mahasiswa"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            to={ROUTES.PRESTASI}
            className="bg-primary text-white px-10 py-3 rounded-ifups hover:bg-blue-900 transition-colors inline-block"
          >
            Lihat Semua Prestasi
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Alumni;
