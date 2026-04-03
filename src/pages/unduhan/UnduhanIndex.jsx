import { Link } from "react-router-dom";
import { ArrowLeftCircle, FileText, Download, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "../../constants/routes";
import { ENDPOINTS } from "../../constants/endpoints";
import useFetch from "../../hooks/useFetch";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import SEO from "../../components/SEO";

const UnduhanIndex = () => {
  const { data, loading, error } = useFetch(ENDPOINTS.UNDUHAN_LIST(50));
  
  const downloadsData = data?.data || [];

  return (
    <div className="py-24 bg-gray-50/50 min-h-screen relative overflow-hidden">
      <SEO 
        title="Pusat Unduhan"
        description="Pusat unduhan dokumen resmi, formulir akademik, dan panduan untuk mahasiswa, dosen, dan alumni Prodi Informatika UPS Tegal."
        url="/unduhan"
      />
      <Link
        to={ROUTES.HOME}
        className="fixed top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full hover:shadow-lg transition text-primary"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">
            Pusat Unduhan
          </h1>
          <p className="text-lg text-gray-600">
            Dokumen resmi, formulir akademik, dan panduan untuk mahasiswa dan dosen.
          </p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-6 rounded-full" />
        </motion.div>

        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
          </div>
        )}

        {error && !loading && (
          <div className="text-center p-8 bg-white shadow rounded-2xl border border-red-100">
            <p className="text-red-500 font-medium">Gagal memuat data unduhan. Silakan coba lagi nanti.</p>
          </div>
        )}

        {!loading && !error && downloadsData.length === 0 && (
          <div className="text-center p-12 bg-white shadow-sm border border-gray-100 rounded-2xl">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300">
              <FileText size={32} />
            </div>
            <p className="text-gray-500 font-medium">Belum ada file yang tersedia untuk diunduh.</p>
          </div>
        )}

        {!loading && !error && downloadsData.length > 0 && (
          <motion.div 
            className="grid gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {downloadsData.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">{item.nama_file}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      {item.keterangan && <span>{item.keterangan}</span>}
                      {item.created_at && (
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {format(new Date(item.created_at), "d MMM yyyy", { locale: localeId })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <a
                  href={item.file_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-800 text-white px-5 py-2.5 rounded-full font-medium hover:shadow-lg hover:from-blue-800 hover:to-primary transition-all active:scale-95 shrink-0"
                >
                  <Download size={18} />
                  <span>Unduh File</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UnduhanIndex;
