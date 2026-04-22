import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PLACEHOLDERS } from "../constants/placeholders";

const Organisasi = () => {
  const organisations = [
    {
      name: "HMIF",
      description: "Himpunan Mahasiswa Informatika",
      logo: "/LogoHMIF.png",
    },
    {
      name: "METAMESTA",
      description: "Komunitas Programming Tegal",
      logo: "/Logo Metamesta.png",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section id="organisasi" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Organisasi & Komunitas
          </h2>
          <p className="text-gray-600 text-lg">Program Studi Informatika</p>
          <div className="w-16 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20">
          {organisations.map((org, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 bg-white p-3 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  src={org.logo}
                  alt={`Logo ${org.name}`}
                  className="h-24 w-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = PLACEHOLDERS.ORGANISASI(org.name);
                  }}
                />
              </div>

              <h3 className="text-lg font-semibold text-primary  transition-colors">
                {org.name}
              </h3>
              <p className="text-sm text-gray-600">{org.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Organisasi;
