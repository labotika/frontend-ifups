import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle, Cpu, ShieldCheck, GraduationCap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ROUTES } from "../../constants/routes";
import { PLACEHOLDERS } from "../../constants/placeholders";
import { handleImageError } from "../../utils/imageUrl";
import SEO from "../../components/SEO";

const FeaturePoint = ({ icon, title, delay, isVisible }) => {
  return (
    <div
      className={`flex items-start gap-4 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-primary mb-1">{title}</h4>
        <p className="text-gray-600">
          Deskripsi singkat tentang poin keunggulan ini untuk meyakinkan pengunjung.
        </p>
      </div>
    </div>
  );
};

const KEY_FEATURES = [
  { icon: Cpu, title: "Fokus Kurikulum AI & IoT", delay: 300 },
  { icon: ShieldCheck, title: "Akreditasi", delay: 450 },
  { icon: GraduationCap, title: "Profil Lulusan Siap Kerja", delay: 600 },
];

const AboutIndex = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const lastFeatureDelay = KEY_FEATURES[KEY_FEATURES.length - 1].delay;

  return (
    <div ref={sectionRef} className="py-24 bg-white min-h-screen relative overflow-hidden">
      <SEO 
        title="Tentang Informatika UPS"
        description="Sejarah singkat, visi misi, dan kurikulum Program Studi Informatika Universitas Pancasakti Tegal yang berfokus pada AI dan IoT."
        url="/about"
      />
      <button
        onClick={() => navigate(-1)}
        aria-label="Kembali ke Halaman Sebelumnya"
        className="absolute top-12 left-10 md:left-12 z-20 flex items-center gap-2 text-primary bg-white shadow-md px-4 py-2 rounded-full hover:bg-gray-100 hover:shadow-lg hover:text-secondary transition-all"
      >
        <ArrowLeftCircle size={24} className="text-secondary" />
        <span className="hidden sm:inline font-medium">Kembali</span>
      </button>

      <div className="container mx-auto max-w-5xl px-4">
        <div
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Tentang Informatika UPS
          </h1>
          <p className="text-xl text-gray-600">
            Unggul, Inovatif, dan Berwawasan Global di Bidang AI & IoT.
          </p>
          <div className="w-24 h-1 bg-secondary mx-auto mt-6" />
        </div>

        <div
          className={`overflow-hidden shadow-xl mb-12 transition-all duration-700 ease-out delay-100 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-5 scale-95"
          }`}
        >
          <img
            src="/gedungUps2.jpg"
            alt="Kampus Universitas Pancasakti Tegal"
            className="w-full h-auto aspect-video object-cover"
            onError={(e) => handleImageError(e, PLACEHOLDERS.GEDUNG)}
          />
        </div>

        <article
          className={`prose prose-lg max-w-none text-gray-800 leading-relaxed prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:underline transition-all duration-700 ease-out delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2>Sejarah Singkat & Komitmen</h2>
          <p>
            Program Studi Informatika di Universitas Pancasakti Tegal (UPS) didirikan untuk
            menjawab tantangan era digital dan kebutuhan industri akan talenta teknologi yang
            kompeten. Sejak awal berdirinya, kami berkomitmen untuk menyediakan pendidikan
            berkualitas tinggi yang tidak hanya fokus pada teori, tetapi juga pada penerapan
            praktis di dunia nyata.
          </p>
          <p>
            Dengan Visi kami untuk menjadi program studi unggul di bidang{" "}
            <strong>AI (Artificial Intelligence) dan IoT (Internet of Things)</strong> pada
            tahun 2028, kami terus memperbarui kurikulum, meningkatkan fasilitas, dan membangun
            kemitraan strategis.
          </p>

          <h2 className="mt-12">Keunggulan Kami</h2>
          <p>
            Kami merancang program kami untuk memastikan lulusan siap bersaing dan menjadi
            pemimpin di industri teknologi.
          </p>
        </article>

        <div className="max-w-none space-y-8 my-10">
          {KEY_FEATURES.map((feature) => (
            <FeaturePoint
              key={feature.title}
              icon={<feature.icon size={24} className="text-primary" />}
              title={feature.title}
              delay={feature.delay}
              isVisible={isVisible}
            />
          ))}
        </div>

        <article
          className={`prose prose-lg max-w-none text-gray-800 leading-relaxed prose-headings:text-primary prose-a:text-blue-600 hover:prose-a:underline transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: `${lastFeatureDelay + 150}ms` }}
        >
          <h2>Bergabunglah Dengan Kami</h2>
          <p>
            Kami mengundang Anda untuk menjadi bagian dari komunitas pembelajar yang dinamis dan
            inovatif. Jelajahi bagaimana Program Studi Informatika UPS Tegal dapat menjadi
            langkah awal kesuksesan karir Anda di dunia teknologi.
          </p>
        </article>
      </div>
    </div>
  );
};

export default AboutIndex;
