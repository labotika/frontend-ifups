import { Link } from "react-router-dom";
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

const DosenIndex = () => {
  const { data: responseData, loading, error } = useFetch(ENDPOINTS.DOSEN_LIST());

  const dosenList = normalizeListResponse(responseData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }

  if (error || dosenList.length === 0) {
    return (
      <div className="py-24 bg-white min-h-screen relative flex flex-col items-center justify-center text-center px-4">
        <Link
          to={ROUTES.HOME}
          aria-label="Kembali ke Halaman Utama"
          className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
        >
          <ArrowLeftCircle size={24} className="text-secondary" />
          <span className="hidden sm:inline font-medium">Kembali</span>
        </Link>
        <h1 className="text-4xl font-bold text-primary mb-4">Oops!</h1>
        <p className="text-xl text-gray-600">
          Data dosen tidak tersedia saat ini.
        </p>
        <Link
          to={ROUTES.HOME}
          className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-800 transition-colors"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative overflow-hidden">
      <SEO 
        title="Staf Pengajar"
        description="Kenali profil, bidang keahlian, dan jabatan fungsional dari staf pengajar di Program Studi Informatika Universitas Pancasakti Tegal."
        url="/dosen"
      />
      <Link
        to={ROUTES.HOME}
        className="fixed top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full hover:shadow-lg transition text-primary"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Staf Pengajar
          </h1>
          <p className="text-xl text-gray-600">
            Program Studi Informatika Universitas Pancasakti Tegal
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {dosenList.map((dosen) => {
            const jabatan = dosen.jabatan_fungsional || dosen.jabatanFungsional || dosen.jabatan;
            return (
              <motion.div
                key={dosen.id}
                variants={cardItem}
                className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl max-w-xs mx-auto sm:max-w-none w-full"
              >
                <Link to={ROUTES.DOSEN_DETAIL(dosen.id)} className="block h-full w-full">
                  <div className="relative overflow-hidden h-full">
                    <img
                      src={dosen.foto_url || dosen.foto || PLACEHOLDERS.DOSEN}
                      alt={dosen.nama}
                      className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => handleImageError(e, PLACEHOLDERS.DOSEN)}
                    />

                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                      <h3 className="text-base font-bold text-white leading-snug mb-1 drop-shadow-md">
                        {dosen.nama}
                      </h3>

                      {jabatan && (
                        <p className="text-[10px] text-secondary font-semibold tracking-wide uppercase opacity-80">
                          {jabatan}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default DosenIndex;