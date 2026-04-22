
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PLACEHOLDERS } from "../constants/placeholders";


const About = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              setTextVisible(true);
            } else if (entry.target === imageRef.current) {
              setImageVisible(true);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentTextRef = textRef.current;
    const currentImageRef = imageRef.current;

    if (currentTextRef) observer.observe(currentTextRef);
    if (currentImageRef) observer.observe(currentImageRef);

    return () => {
      
      if (currentTextRef) observer.unobserve(currentTextRef);
      if (currentImageRef) observer.unobserve(currentImageRef);
    };
  
  }, []);
 

  return (
    
    <section id="tentang" className="py-24 bg-gray-50 overflow-hidden"> 
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Tentang Kami
          </h2>
          <p className="text-xl text-gray-600">Program Studi Informatika</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 ease-out ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
            }`}
          >
            
            <img
              src="/gedungUps2.jpg" 
              alt="Mahasiswa Informatika UPS Tegal"
              className="object-cover w-full h-full shadow-2xl aspect-[4/3]"
              onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDERS.GEDUNG; }}
            />
            
          </div>

          
          <div
            ref={textRef}
            className={`transition-all duration-700 ease-out delay-200 ${
              textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
            }`}
          >
            
            
            
            <div className="border-l-4 border-secondary pl-6 space-y-4">
              <p className="text-lg text-gray-700 leading-relaxed">
                Program Studi Informatika Universitas Pancasakti Tegal merupakan salah satu program studi 
                unggulan yang berfokus pada pengembangan kompetensi di bidang teknologi informasi. 
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Kami menyediakan pendidikan berkualitas dengan kurikulum yang selalu diperbarui mengikuti 
                perkembangan industri dan kebutuhan dunia kerja.
              </p>
            </div>
            
            
            <Link 
              to="/about"
              className="inline-block bg-secondary text-primary font-semibold px-8 py-3 rounded-ifups hover:bg-yellow-400 transition-colors mt-8"
            >
              Selengkapnya
            </Link>
            
          </div>
          
        </div>
        
        
      </div>
    </section>
  );
};

export default About;

