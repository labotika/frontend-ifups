import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import { motion } from "framer-motion";
import useFetch from "../../hooks/useFetch";
import { ENDPOINTS } from "../../constants/endpoints";
import { ROUTES } from "../../constants/routes";
import { PLACEHOLDERS } from "../../constants/placeholders";
import { fadeUp, gridContainer, cardItem } from "../../constants/animations";
import { normalizeListResponse } from "../../utils/normalizeResponse";
import { handleImageError } from "../../utils/imageUrl";
import SEO from "../../components/SEO";

const AlumniIndex = () => {
  const navigate = useNavigate();
  const {
    data: responseData,
    loading,
    error,
  } = useFetch(ENDPOINTS.PRESTASI_LIST());

  const alumniList = normalizeListResponse(responseData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }

  if (error || alumniList.length === 0) {
    return (
      <div className="py-24 bg-white min-h-screen relative flex flex-col items-center justify-center text-center px-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Kembali ke Halaman Sebelumnya"
          className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
        >
          <ArrowLeftCircle size={24} className="text-secondary" />
          <span className="hidden sm:inline font-medium">Kembali</span>
        </button>
        <h1 className="text-4xl font-bold text-primary mb-4">Oops!</h1>
        <p className="text-xl text-gray-600">
          Data alumni tidak dapat dimuat atau belum tersedia.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-800 transition-colors"
        >
          Kembali ke Halaman Sebelumnya
        </button>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white min-h-screen relative overflow-hidden">
      <SEO
        title="Alumni & Prestasi"
        description="Daftar profil alumni dan berbagai prestasi membanggakan dari mahasiswa Program Studi Informatika Universitas Pancasakti Tegal."
        url="/prestasi"
      />
      <button
        onClick={() => navigate(-1)}
        aria-label="Kembali ke Halaman Sebelumnya"
        className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg "
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </button>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Asisten Lab Informatika
          </h1>
          <p className="text-xl text-gray-600">Kebanggaan Prodi Informatika</p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {alumniList.map((alumnus) => (
            <motion.div key={alumnus.id} variants={cardItem}>
              <Link
                to={`${ROUTES.PRESTASI}/${alumnus.id}`}
                className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl block h-full max-w-xs mx-auto sm:max-w-none w-full"
              >
                <div className="relative overflow-hidden h-full">
                  <img
                    src={alumnus.foto_url || PLACEHOLDERS.MAHASISWA}
                    alt={alumnus.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => handleImageError(e, PLACEHOLDERS.MAHASISWA)}
                  />

                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    <h3 className="text-base font-bold text-primary leading-snug mb-1 drop-shadow-sm">
                      {alumnus.nama}
                    </h3>
                    <p className="text-xs text-blue-900 font-medium leading-relaxed opacity-90">
                      {alumnus.pekerjaan ||
                        alumnus.kejuaraan ||
                        alumnus.message}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AlumniIndex;
