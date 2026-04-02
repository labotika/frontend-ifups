<<<<<<< HEAD
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useFetch from "../hooks/useFetch"; // Pastikan path hook ini benar

=======
import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
// Pastikan path ini benar (relatif dari src/sections/)
import { allAlumni } from "../data/alumniData"; 

// Ambil 4 alumni pertama dari data untuk ditampilkan di Beranda
const featuredAlumni = allAlumni.slice(0, 4);

// --- Varian Animasi ---
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
<<<<<<< HEAD
    },
  },
=======
    }
  }
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Alumni = () => {
  // Mengambil data dari API prestasi/alumni
  const { data: responseData, loading, error } = useFetch("/prestasi");

  const prestasiList = Array.isArray(responseData)
    ? responseData
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  // Ambil 4 item pertama untuk ditampilkan di Home
  const featuredPrestasi = prestasiList.slice(0, 4);

  // Tampilan Loading
  if (loading) {
    return (
      <section id="alumni" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-72 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Jika error atau data kosong, bisa return null atau pesan error
  if (error) {
    return null;
  }

  return (
    <section id="alumni" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Judul Section */}
<<<<<<< HEAD
        <motion.div
=======
        <motion.div 
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            MAHASISWA BERPRESTASI
          </h2>
          <p className="text-xl text-gray-600">Kebanggaan Prodi Informatika</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

<<<<<<< HEAD
        {/* Grid Kartu */}
        <motion.div
=======
        {/* Grid Kartu Alumni */}
        <motion.div 
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-14"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
<<<<<<< HEAD
          {featuredPrestasi.map((item) => (
=======
          {featuredAlumni.map((alumnus) => (
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
            <motion.div
              key={item.id}
              variants={cardItem}
<<<<<<< HEAD
              className="bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 group border-b-4 border-secondary relative rounded-2xl"
            >
              {/* --- VVV LINK DITAMBAHKAN DI SINI VVV --- */}
              {/* Menggunakan Link untuk membungkus konten kartu agar bisa diklik */}
              <Link to={`/alumni/${item.id}`} className="block h-full w-full">
                <div className="relative overflow-hidden h-full">
                  <img
                    src={
                      item.foto_url ||
                      "https://placehold.co/400x500/cccccc/ffffff?text=No+Image"
                    }
                    alt={`Foto ${item.nama}`}
                    className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/400x288/cccccc/ffffff?text=Foto+Mahasiswa";
                    }}
                  />

                  {/* Overlay Gradasi (Sesuai desain Dosen) */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-secondary via-secondary/80 to-transparent flex flex-col justify-end items-start text-primary p-5 pt-10">
                    <h3 className="text-base font-bold leading-snug mb-1 drop-shadow-sm line-clamp-1">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-blue-900 font-medium line-clamp-1 opacity-90">
                      {item.kejuaraan || "Prestasi Mahasiswa"}
=======
            >
              {/* --- LINK KE DETAIL --- */}
              <Link
                to={`/alumni/${alumnus.id}`} // Link dinamis ke halaman detail
                className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl block h-full max-w-xs mx-auto sm:max-w-none w-full"
              >
                <div className="relative overflow-hidden h-full">
                  {/* Gambar Tinggi (h-96) */}
                  <img
                    src={alumnus.foto}
                    alt={alumnus.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x500/cccccc/ffffff?text=Foto+${alumnus.nama.split(" ")[0]}`;
                    }}
                  />
                  
                  {/* Overlay Gradasi Kuning */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-secondary via-secondary/80 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end">
                    <h3 className="text-base font-bold text-primary leading-snug mb-1 drop-shadow-sm">
                      {alumnus.nama}
                    </h3>
                    <p className="text-xs text-blue-900 font-medium leading-relaxed opacity-90">
                      {alumnus.pekerjaan}
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
                    </p>
                  </div>
                </div>
              </Link>
<<<<<<< HEAD
              {/* --- ^^^ AKHIR LINK ^^^ --- */}
=======
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
            </motion.div>
          ))}
        </motion.div>

        {/* Tombol Lihat Semua */}
<<<<<<< HEAD
        <motion.div
=======
        <motion.div 
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
          className="text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Link ini mengarah ke halaman Index Alumni/Prestasi */}
          <Link
<<<<<<< HEAD
            to="/alumni" // Pastikan rute ini sesuai dengan AlumniIndex.jsx di App.jsx
=======
            to="/alumni" // Mengarah ke AlumniIndex
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
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
