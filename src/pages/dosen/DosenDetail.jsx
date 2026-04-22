import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Hash,
  Star,
  Briefcase,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { ENDPOINTS } from "../../constants/endpoints";
import { ROUTES } from "../../constants/routes";
import { PLACEHOLDERS } from "../../constants/placeholders";
import { normalizeSingleResponse } from "../../utils/normalizeResponse";
import { handleImageError } from "../../utils/imageUrl";
import SEO from "../../components/SEO";

const DosenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: responseData, loading, error } = useFetch(ENDPOINTS.DOSEN_BY_ID(id));
  const [isCopied, setIsCopied] = useState(false);

  const dosen = normalizeSingleResponse(responseData);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error || !dosen) {
    return (
      <div className="py-24 bg-white min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Dosen Tidak Ditemukan
        </h1>
        <button onClick={() => navigate(-1)} className="text-secondary underline hover:text-blue-800">
          Kembali ke Daftar Dosen
        </button>
      </div>
    );
  }

  const jabatan = dosen.jabatan_fungsional || dosen.jabatanFungsional || dosen.jabatan;
  const bidangKeahlian = dosen.bidangKeahlian || dosen.bidang_keahlian || dosen.keahlian;

  return (
    <div className="py-24 bg-gray-50 min-h-screen relative">
      <SEO 
        title={`Profil Dosen - ${dosen.nama}`}
        description={`Profil Dosen Prodi Informatika: ${dosen.nama}. Jabatan Fungsional: ${jabatan || "-"}`}
        image={dosen.foto_url || dosen.foto}
        url={`/dosen/${id}`}
      />
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full hover:shadow-lg transition text-primary"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </button>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <div className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden border-b-4 border-secondary rounded-2xl">
              <div className="relative overflow-hidden">
                <img
                  src={dosen.foto_url || dosen.foto || PLACEHOLDERS.DOSEN}
                  alt={dosen.nama}
                  className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => handleImageError(e, PLACEHOLDERS.DOSEN)}
                />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/90 to-transparent pt-28 pb-5 px-5">
                  <h3 className="text-base font-bold text-white leading-snug mb-1">
                    {dosen.nama}
                  </h3>
                  {jabatan && (
                    <p className="text-[10px] text-secondary font-semibold uppercase tracking-wide opacity-80">
                      {jabatan}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 space-y-10 border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-50 text-primary">
                    <Hash size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      NIP / NIDN
                    </p>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-medium text-gray-800 tracking-wide">
                        {dosen.nip || dosen.nidn || "-"}
                      </p>
                      {(dosen.nip || dosen.nidn) && (
                        <button
                          onClick={() => handleCopy(dosen.nip || dosen.nidn)}
                          className="p-1.5 rounded-full hover:bg-gray-100 transition"
                        >
                          {isCopied ? (
                            <Check size={18} className="text-green-500" />
                          ) : (
                            <Copy size={18} className="text-gray-400" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      Jabatan Fungsional
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {jabatan || "-"}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-yellow-50 text-yellow-600">
                    <Star size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Bidang Keahlian
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bidangKeahlian
                        ? bidangKeahlian
                            .split(",")
                            .map((skill, i) => (
                              <span
                                key={i}
                                className="px-4 py-1.5 bg-gray-100 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-secondary/10 transition"
                              >
                                {skill.trim()}
                              </span>
                            ))
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DosenDetail;
