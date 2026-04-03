import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch";
import { ENDPOINTS } from "../constants/endpoints";
import { ROUTES } from "../constants/routes";
import { PLACEHOLDERS } from "../constants/placeholders";
import { fadeUp, gridContainer, cardItem } from "../constants/animations";
import { normalizeListResponse } from "../utils/normalizeResponse";
import { handleImageError } from "../utils/imageUrl";

const Dosen = () => {
  const { data: responseData, loading, error } = useFetch(ENDPOINTS.DOSEN);

  const dosenList = normalizeListResponse(responseData);
  const featuredLecturers = dosenList.slice(0, 4);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredLecturers.length === 0) {
    return null;
  }

  return (
    <section id="dosen" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            MEET OUR
          </h2>
          <p className="text-xl text-gray-600">LECTURERS</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredLecturers.map((lecturer) => (
            <motion.div
              key={lecturer.id}
              variants={cardItem}
              className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl max-w-xs mx-auto sm:max-w-none w-full"
            >
              <Link to={ROUTES.DOSEN_DETAIL(lecturer.id)} className="block h-full w-full">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={lecturer.foto_url || lecturer.foto || PLACEHOLDERS.DOSEN}
                    alt={lecturer.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => handleImageError(e, PLACEHOLDERS.DOSEN)}
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    <h3 className="text-base font-bold text-white leading-snug mb-1 drop-shadow-md">
                      {lecturer.nama}
                    </h3>
                    <p className="text-xs text-gray-200 font-medium leading-relaxed opacity-90">
                      {lecturer.jabatan || "Dosen"}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Link
            to={ROUTES.DOSEN}
            className="bg-primary text-white px-10 py-3 rounded-ifups hover:bg-blue-900 transition-colors inline-block"
          >
            Lihat Semua Dosen
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Dosen;
