import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { PLACEHOLDERS } from "../constants/placeholders";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const images = [
    "/gedungUps1.jpg",
    "/gedungUps2.png",
    "/gedungUps3.png",
    "/gedungUps4.png",
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        if (prev === images.length - 1) {
          setDirection(-1);
          return prev - 1;
        } else if (prev === 0) {
          setDirection(1);
          return prev + 1;
        } else {
          return prev + direction;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [direction, images.length]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div
        className="flex h-full w-full transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = PLACEHOLDERS.HERO(index);
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-indigo-600/40 to-blue-900/60 bg-[size:200%_auto] animate-gradient-pan"></div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-10">
        <h1
          className={`text-4xl md:text-6xl font-bold leading-tight mb-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Selamat Datang di <br />
          <span className="text-yellow-400">Program Studi Informatika</span>
        </h1>

        <div
          className={`w-24 h-1 bg-yellow-400 mx-auto my-6 transform transition-transform duration-1000 delay-300 ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>

        <h2
          className={`text-2xl md:text-3xl font-semibold transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          UNIVERSITAS PANCASAKTI TEGAL
        </h2>

        <div
          className={`mt-12 flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://pmb.upstegal.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-400 text-primary font-bold px-8 py-4 rounded-ifups hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse-slow inline-block"
          >
            Daftar Sekarang
          </a>

          <Link
            to="/about"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded-ifups hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300"
          >
            Pelajari Lebih Lanjut
          </Link>
        </div>

        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-[1200ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to="/about"
            aria-label="Pelajari Lebih Lanjut"
            className="text-white animate-bounce-slow"
          >
            <ChevronDown size={40} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
