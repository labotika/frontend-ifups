import { Link } from "react-router-dom";
import { FileText, Download, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "../constants/routes";
import { ENDPOINTS } from "../constants/endpoints";
import useFetch from "../hooks/useFetch";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const Unduhan = () => {
  const { data, loading } = useFetch(ENDPOINTS.UNDUHAN_LIST(5));
  const downloadsData = data?.data || [];

  return (
    <section id="unduhan" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            PUSAT UNDUHAN
          </h2>
          <p className="text-xl text-gray-600">Dokumen dan Formulir Akademik</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </motion.div>

        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary" />
          </div>
        )}

        {!loading && downloadsData.length === 0 && (
          <p className="text-center text-gray-500 mb-14">
            Belum ada dokumen yang tersedia untuk diunduh.
          </p>
        )}

        {!loading && downloadsData.length > 0 && (
          <div className="grid gap-4 mb-14">
            {downloadsData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{item.nama_file}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
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
                  className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-900 transition-all active:scale-95 shrink-0"
                >
                  <Download size={18} />
                  <span>Unduh</span>
                </a>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link
            to={ROUTES.UNDUHAN}
            className="bg-primary text-white px-10 py-3 rounded-full hover:bg-blue-900 transition inline-block font-semibold"
          >
            Lihat Semua Unduhan
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Unduhan;
