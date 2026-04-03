import { Target, Rocket, ClipboardCheck } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';


const VisiMisi = () => {
  
  const [visiVisible, setVisiVisible] = useState(false);
  const [misiVisible, setMisiVisible] = useState(false);
  const [tujuanVisible, setTujuanVisible] = useState(false);

  const visiRef = useRef(null);
  const misiRef = useRef(null);
  const tujuanRef = useRef(null);

  useEffect(() => {
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {

            if (entry.target === visiRef.current) {
              setVisiVisible(true);
            } else if (entry.target === misiRef.current) {
              setMisiVisible(true);
            } else if (entry.target === tujuanRef.current) {
              setTujuanVisible(true);
            }
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 } 
    );

   
    const refs = [visiRef, misiRef, tujuanRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    
    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []); 
  

  return (
    
    <section id="visi-misi" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Visi, Misi & Tujuan</h2>
          <p className="text-xl text-gray-600">Prodi Informatika</p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4"></div>
        </div>

        
        <div className="max-w-6xl mx-auto space-y-16">
          
          
          <div 
            ref={visiRef}
            className={`flex flex-col items-center transition-all duration-700 ease-out ${
              visiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <div className="flex justify-center mb-6">
              <Target size={80} className="text-primary opacity-20" strokeWidth={1.5} />
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-semibold text-primary mb-4">Visi</h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed border-l-4 border-secondary pl-4">
                "Menjadi program studi yang unggul dibidang literasi rekayasa berbasis AI (Artificial Intelligence) dan teknologi IoT yang berwawasan global pada tahun 2028."
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-gray-200">

            
            <div 
              ref={misiRef}
              className={`flex flex-col items-center transition-all duration-700 ease-out delay-200 ${
                misiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              
              <div className="flex justify-center mb-6">
                <Rocket size={80} className="text-primary opacity-20" strokeWidth={1.5} />
              </div>
              
              <div className="text-center w-full">
                <h3 className="text-3xl font-semibold text-primary mb-4">Misi</h3>
                <ul className="text-gray-700 leading-relaxed space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">a)</span>
                    <span className="flex-1">
                      Melaksanakan pendidikan, penelitian dan pengabdian kepada masyarakat di bidang informatika yang berbasis dengan AI (Artificial Intelligence) dan teknologi IoT.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">b)</span>
                    <span className="flex-1">
                      Menghasilkan karya inovatif dan publikasi yang relevan dengan kebutuh masyarakat dalam perkembangan IPTEK dengan AI (Artificial Intelligence), dan teknologi IoT.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">c)</span>
                    <span className="flex-1">
                      Membangun jejaring kerjasama kemitraan dibidang informatika pada lingkup nasional dan internasional.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            
            <div 
              ref={tujuanRef}
              className={`flex flex-col items-center transition-all duration-700 ease-out delay-[400ms] ${
                tujuanVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              
              <div className="flex justify-center mb-6">
                <ClipboardCheck size={80} className="text-primary opacity-20" strokeWidth={1.5} />
              </div>
              
              <div className="text-center w-full">
                <h3 className="text-3xl font-semibold text-primary mb-4">Tujuan</h3>
                
                <ul className="text-gray-700 leading-relaxed space-y-4 text-left">
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">a)</span>
                    <span className="flex-1">
                      Dihasilkannya lulusan yang kompeten dibidang informatika yang berbasis AI (Artificial Intelligence) dan teknologi IoT;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">b)</span>
                    <span className="flex-1">
                      Terwujudnya karya penelitian dan pengabdian kepada masyarakat yang inovatif beserta publikasi yang relevan dengan kebutuhan masyarakat dalam perkembangan IPTEK dengan AI (Artificial Intelligence) dan teknologi IoT;
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-primary mr-3">c)</span>
                    <span className="flex-1">
                      Terbangunnya jejaring kerjasama kemitraan di bidang informatika pada lingkup nasional dan internasional.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
          
          
        </div>
        
      </div>
    </section>
  );
};

export default VisiMisi;

