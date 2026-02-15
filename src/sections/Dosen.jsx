import { Link } from "react-router-dom"; 
import { motion } from "framer-motion";
import { allDosen } from "../data/dosenData"; // 1. Impor data statis

// 2. Ambil 4 dosen pertama dari data statis
const featuredLecturers = allDosen.slice(0, 4);

// --- Varian Animasi ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const gridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
      delayChildren: 0.2,   
    }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Dosen = () => {
  return (
    <section id="dosen" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Judul Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">MEET OUR</h2>
          <p className="text-xl text-gray-600">LECTURERS</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </motion.div>

        {/* Grid Card Dosen */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {featuredLecturers.map((lecturer) => (
            <motion.div
              key={lecturer.id}
              variants={cardItem} 
              // Desain Kartu (Rounded, Shadow, Ramping di Mobile)
              className="group bg-white shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1 border-b-4 border-secondary relative rounded-2xl max-w-xs mx-auto sm:max-w-none w-full" 
            >
              {/* --- LINK KE DETAIL DOSEN DITAMBAHKAN --- */}
              <Link to={`/dosen/${lecturer.id}`} className="block h-full w-full">
                <div className="relative overflow-hidden h-full">
                  {/* Gambar Tinggi (h-96) */}
                  <img
                    src={lecturer.foto}
                    alt={lecturer.nama}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" 
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x500/cccccc/ffffff?text=Foto+Dosen"; }}
                  />
                  
                  {/* Overlay Gradasi Biru */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary via-primary/90 to-transparent pt-28 pb-5 px-5 flex flex-col justify-end"> 
                    
                    {/* Nama Dosen */}
                    <h3 className="text-base font-bold text-white leading-snug mb-1 drop-shadow-md">
                      {lecturer.nama}
                    </h3>
                    
                     

                    {/* Menampilkan NIP jika ada */}
                    {lecturer.nip && (
                      <p className="text-[10px] text-secondary font-semibold tracking-wide uppercase opacity-80">
                         {lecturer.jabatan}
                      </p>
                    )}

                  </div>
                </div>
              </Link>
               {/* --- AKHIR LINK --- */}
            </motion.div>
          ))}
        </motion.div>

        {/* Tombol Lihat Semua */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            to="/dosen" 
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