import React from "react";
import { motion } from "framer-motion";

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
      staggerChildren: 0.15, 
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



const Kontak = () => {
  const contactInfo = [
    {
      title: "Email",
      subtitle: "Hubungi kami melalui email untuk pertanyaan umum",
      detail: "admin@upstegal.ac.id",
      link: "mailto:admin@upstegal.ac.id",
      color: "#003D8D",
      target: "_blank",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "WhatsApp",
      subtitle: "Klik untuk memulai percakapan dengan kami",
      detail: "(0283) 351082",
      link: "https://wa.me/62811269009",
      color: "#003D8D",
      target: "_blank",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
      ),
    },
    {
      title: "Lokasi",
      subtitle: "Kampus kami berada di",
      detail: "Jl. Halmahera No.KM. 01, Mintaragen, Kec. Tegal Tim., Kota Tegal, Jawa Tengah 52121",
      link: "https://maps.app.goo.gl/AjEGFmVbfNxE3rMM7",
      color: "#003D8D",
      target: "_blank",
      icon: (
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  const handleContactClick = (link, platform) => {
    if (platform === "Lokasi") {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  return (
    <section
      id="kontak"
      className="py-24 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
    >
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003D8D] tracking-tight mb-3">
          Hubungi Kami
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Kita siap melayani kebutuhan informasi
          dan pertanyaan Anda
        </p>
        <div className="w-20 h-1 bg-secondary mx-auto mt-5 rounded-full"></div>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} 
        >
          {contactInfo.map((contact, index) => (
            
            <motion.div 
              key={index} 
              variants={cardItem} 
              className="group"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: contact.color }}
              >
                {contact.icon}
              </div>

              <h4 className="text-xl font-semibold text-[#003D8D] mb-2">
                {contact.title}
              </h4>

              <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                {contact.subtitle}
              </p>

              <p className="text-gray-800 font-medium text-sm">{contact.detail}</p>

              <button
                onClick={() => handleContactClick(contact.link, contact.title)}
                className="mt-5 bg-[#003D8D] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-blue-900 transition-all duration-300 group-hover:scale-105"
              >
                {contact.title === "Lokasi" ? "Lihat Peta" : `Hubungi via ${contact.title}`}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute inset-0 -z-10 opacity-5 bg-[url('/grid-pattern.svg')] bg-center bg-repeat"></div>
      </div>
    </section>
  );
};

export default Kontak;