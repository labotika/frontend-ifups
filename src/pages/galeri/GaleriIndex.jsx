import { Link } from "react-router-dom";
import {
  ArrowLeftCircle,
  Image as ImageIcon,
  ChevronDown,
  Share2,
  Heart,
  Download,
} from "lucide-react";
import { useState } from "react";
import { allGallery, galleryCategories } from "../../data/galeriData";
import { motion, AnimatePresence } from "framer-motion";

/* ================= SMART CARD ================= */

const GalleryCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes || 0);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const url = `${window.location.origin}/galeri`;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: "Lihat foto ini",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link disalin ke clipboard");
    }
  };

  return (
    <div className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-96 object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x400/cccccc/ffffff?text=Foto+${item.id}`;
        }}
      />

      {/* SMART INFO OVERLAY */}
      <div
        className={`absolute inset-x-2 bottom-2 rounded-xl backdrop-blur-md overflow-hidden transition-colors duration-500 ${
          open ? "bg-white/95 shadow-lg" : "bg-white/60 hover:bg-white/80"
        }`}
      >
        {/* HEADER */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-3 text-left"
        >
          <div className="min-w-0 pr-2">
            <h3
              className={`font-bold transition-all duration-300 text-primary ${
                open
                  ? "text-base whitespace-normal leading-snug"
                  : "text-sm truncate"
              }`}
            >
              {item.title}
            </h3>
            {!open && (
              <p className="text-[10px] text-gray-600 mt-0.5 truncate">
                Klik untuk detail
              </p>
            )}
          </div>

          <span
            className={`p-1.5 rounded-full bg-white/70 transition-transform duration-500 ${
              open ? "rotate-180 bg-gray-100" : ""
            }`}
          >
            <ChevronDown size={16} className="text-primary" />
          </span>
        </button>

        {/* EXPANDED CONTENT */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-3 pb-3 pt-0 text-xs text-gray-700 space-y-4">
                <div className="h-px w-full bg-gray-200" />

                {/* DATE */}
                <div className="flex items-center gap-1 text-gray-500">
                  <ImageIcon size={12} />
                  <span>{item.date}</span>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* LIKE */}
                    <button
                      onClick={toggleLike}
                      className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition"
                    >
                      <Heart
                        size={16}
                        className={liked ? "fill-red-500 text-red-500" : ""}
                      />
                      <span className="text-xs font-medium">{likes}</span>
                    </button>

                    {/* SHARE */}
                    <button
                      onClick={handleShare}
                      className="text-gray-600 hover:text-primary transition"
                      title="Bagikan"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                  {/* DOWNLOAD */}
                  <a
                    href={item.image}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-gray-600 hover:text-primary transition"
                    title="Unduh foto"
                  >
                    <Download size={16} />
                    <span className="text-xs font-medium">Unduh</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ================= GALERI INDEX ================= */

const GaleriIndex = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredGallery =
    activeCategory === "Semua"
      ? allGallery
      : allGallery.filter((item) => item.category === activeCategory);

  return (
    <div className="py-24 bg-white min-h-screen relative overflow-hidden">
      {/* BACK BUTTON */}
      <Link
        to="/"
        className="fixed top-8 left-8 z-30 flex items-center gap-2 px-4 py-2 bg-white shadow-md rounded-full hover:shadow-lg transition text-primary"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </Link>

      <div className="container mx-auto px-4">
        {/* HEADER */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Galeri Kegiatan
          </h1>
          <p className="text-xl text-gray-600">
            Dokumentasi aktivitas akademik dan non-akademik
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
        </motion.div>

        

        {/* MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto space-y-6">
          {filteredGallery.map((item) => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {filteredGallery.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada foto untuk kategori ini.
          </p>
        )}
      </div>
    </div>
  );
};

export default GaleriIndex;
