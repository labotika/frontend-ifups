import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Monitor } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { ROUTES } from "../../constants/routes";
import { PLACEHOLDERS } from "../../constants/placeholders";
import { normalizeSingleResponse } from "../../utils/normalizeResponse";
import { handleImageError } from "../../utils/imageUrl";
import SEO from "../../components/SEO";

const SECTION_LABEL = "Asisten Laboratorium Informatika";

const AlumniDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: responseData, loading, error } = useFetch(`/prestasi/${id}`);

  const alumnus = normalizeSingleResponse(responseData);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary" />
      </div>
    );
  }

  if (error || !alumnus) {
    return (
      <div className="py-24 bg-white min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Data Tidak Ditemukan
        </h1>
        <p className="text-gray-500 mb-6">
          {error ? "Terjadi kesalahan koneksi." : "Data alumni tidak tersedia."}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-secondary underline hover:text-blue-800"
        >
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  const displayName = alumnus.nama_mahasiswa || alumnus.nama;
  const displayPhoto = alumnus.foto_url || PLACEHOLDERS.MAHASISWA;
  const displayAchievement =
    alumnus.kejuaraan || alumnus.pekerjaan || "Detail kejuaraan tidak tersedia";
  const displayDescription =
    alumnus.deskripsi ||
    alumnus.bio ||
    alumnus.message ||
    "Belum ada deskripsi yang ditambahkan.";

  return (
    <div className="py-24 bg-white min-h-screen relative">
      <SEO
        title={`Profil Alumni & Prestasi - ${displayName}`}
        description={`Profil Alumni/Mahasiswa Prodi Informatika: ${displayName}. ${
          alumnus.prestasi ? `Prestasi: ${alumnus.prestasi}` : ""
        }`}
        image={alumnus.foto_url || alumnus.foto}
        url={`/prestasi/${id}`}
      />

      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 text-primary transition-all"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </button>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Foto Alumni */}
          <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-6">
              <img
                src={displayPhoto}
                alt={alumnus.nama}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, PLACEHOLDERS.MAHASISWA)}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/80 to-transparent pt-20 pb-6 px-6">
                <h2 className="text-2xl font-bold text-primary">
                  {alumnus.nama}
                </h2>
                <p className="text-blue-900 text-sm mt-1">
                  {alumnus.angkatan ? `Angkatan ${alumnus.angkatan}` : "Alumni"}
                </p>
              </div>
            </div>
          </div>

          {/* Detail Alumni */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-500 mb-1 flex items-center gap-2">
                <Monitor size={20} className="text-secondary" />
                {SECTION_LABEL}
              </h3>
              <p className="text-3xl font-bold text-primary leading-tight">
                {displayAchievement}
              </p>
            </div>

            <div className="w-full h-px bg-gray-200" />

            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Moto</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {displayDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDetail;
