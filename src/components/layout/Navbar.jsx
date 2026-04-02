import { useState, useEffect } from "react";
import {
<<<<<<< HEAD
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
  Home,
  Info,
  Users,
  GraduationCap,
  Briefcase,
  Newspaper,
  Image,
  Mail,
  Target, // <-- IKON DITAMBAHKAN DI SINI
=======
  Menu, X, ChevronsLeft, ChevronsRight,
  Home, Info, Users, GraduationCap,
  Briefcase, Newspaper, Image, Mail,
  Target, Download, ChevronDown, ChevronRight, FileText // Tambah ikon baru
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ onToggleCollapse }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");
  
  // --- STATE UNTUK DROPDOWN ---
  const [openDropdown, setOpenDropdown] = useState(null); // Menyimpan nama menu yang terbuka

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Visi Misi", href: "#visi-misi", icon: Target },
    { name: "Tentang", href: "#tentang", icon: Info },
    { name: "Organisasi", href: "#organisasi", icon: Users },
    { name: "Dosen", href: "#dosen", icon: GraduationCap },
    { name: "Alumni", href: "#alumni", icon: Briefcase },
    { name: "Berita", href: "#berita", icon: Newspaper },
<<<<<<< HEAD
=======
    { name: "Galeri", href: "#galeri", icon: Image },
    
    // --- MENU BARU DENGAN DROPDOWN ---
    
    // ---------------------------------
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362

    { name: "Kontak", href: "#kontak", icon: Mail },
    { 
      name: "Unduhan", 
      icon: Download, 
      isDropdown: true, // Penanda dropdown
      subItems: [
        // Pastikan file-file ini ada di folder public/files/ Anda agar download berhasil
        { name: "Panduan Akademik", file: "/files/panduan-akademik.pdf" },
        { name: "Kalender Akademik", file: "/files/kalender-2024.pdf" },
        { name: "Formulir Pendaftaran", file: "/files/form-daftar.pdf" },
      ]
    },
  ];

  useEffect(() => {
    if (!isHomePage) {
      if (location.pathname.startsWith('/dosen')) setActiveHash('#dosen');
      else if (location.pathname.startsWith('/berita')) setActiveHash('#berita');
      else if (location.pathname.startsWith('/alumni')) setActiveHash('#alumni');
      else if (location.pathname.startsWith('/about')) setActiveHash('#tentang');
      else if (location.pathname.startsWith('/galeri')) setActiveHash('#galeri');
      else setActiveHash(''); 
      
      if (onToggleCollapse) onToggleCollapse(false);
      return;
    }

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    if (onToggleCollapse) onToggleCollapse(isCollapsed);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
<<<<<<< HEAD

      { root: null, rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) observer.observe(section);
=======
      { root: null, rootMargin: "-40% 0px -60% 0px", threshold: 0 } 
    );

    navItems.forEach((item) => {
      if (item.href && item.href.startsWith('#')) {
        const section = document.querySelector(item.href);
        if (section) observer.observe(section);
      }
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
<<<<<<< HEAD
  }, [isCollapsed, onToggleCollapse]);
=======
  }, [isCollapsed, onToggleCollapse, isHomePage, location.pathname]);
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setOpenDropdown(null); // Tutup dropdown saat collapse
    if (onToggleCollapse) onToggleCollapse(newState);
  };

<<<<<<< HEAD
  const handleLinkClick = (e, href) => {
    e.preventDefault();

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }

    window.history.pushState(null, null, href);

=======
  const handleLinkClick = (e, item) => {
    // --- LOGIKA DROPDOWN ---
    if (item.isDropdown) {
      e.preventDefault();
      // Toggle dropdown (buka/tutup)
      setOpenDropdown(openDropdown === item.name ? null : item.name);
      return; // Jangan navigasi atau tutup sidebar dulu
    }

    // --- LOGIKA LINK BIASA ---
    if (!isHomePage) {
       e.preventDefault();
       if (item.href === '#dosen') navigate('/dosen');
       else if (item.href === '#berita') navigate('/berita');
       else if (item.href === '#alumni') navigate('/alumni');
       else if (item.href === '#galeri') navigate('/galeri'); 
       else if (item.href === '#tentang') navigate('/about');
       else {
         navigate('/');
         setTimeout(() => {
            const section = document.querySelector(item.href);
            if (section) section.scrollIntoView({ behavior: "smooth" });
         }, 100);
       }
       setIsSidebarOpen(false);
       return;
    }

    e.preventDefault();
    setActiveHash(item.href);
    const section = document.querySelector(item.href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    window.history.pushState(null, null, item.href);
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
    setIsSidebarOpen(false);
  };

  // --- FUNGSI DOWNLOAD YANG DIPERBARUI ---
  const handleDownload = (fileUrl, fileName) => {
    // Membuat elemen link sementara untuk memicu download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName || 'download'); // Atribut download memaksa browser mengunduh
    link.setAttribute('target', '_blank'); // Buka di tab baru sebagai fallback
    document.body.appendChild(link);
    
    // Klik link secara programatis
    link.click();
    
    // Bersihkan elemen link
    document.body.removeChild(link);
    
    // Tutup sidebar mobile setelah klik
    setIsSidebarOpen(false); 
  };

  const sidebarWidthClass = isCollapsed ? "w-20" : "w-64";

  return (
    <>
      {!isSidebarOpen && (
        <button
          className={`fixed top-4 left-4 z-50 p-2 rounded-lg lg:hidden transition-all ${
            isScrolled
              ? "bg-white text-blue-700 shadow-md"
              : "bg-blue-800 text-white"
          }`}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}

      <aside
<<<<<<< HEAD
        className={`fixed top-0 left-0 h-full ${sidebarWidthClass} shadow-xl z-40 bg-white transition-all duration-300
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
=======
        className={`fixed top-0 left-0 h-full ${sidebarWidthClass} shadow-xl z-40 bg-white transition-all duration-300 flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
>>>>>>> 2bec0fb5386a17cc0d59bf1f67bb75a626640362
      >
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-800 flex-shrink-0">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src="/Logo IFUPS.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => e.target.src = 'https://placehold.co/40x40/003D8D/FECE00?text=IF'}
              />
              <img
                src="/WeAreIFUPS.svg"
                alt="Fakultas Teknik Informatika"
                className="w-12 h-12 object-contain"
                onError={(e) => e.target.src = 'https://placehold.co/48x48/003D8D/FECE00?text=UPS'}
              />
            </div>
          )}

          <button
            className={`hidden lg:flex p-1 rounded text-white hover:bg-blue-700 transition ${
              isCollapsed ? "mx-auto" : ""
            }`}
            onClick={handleCollapse}
          >
            {isCollapsed ? (
              <ChevronsRight size={24} />
            ) : (
              <ChevronsLeft size={24} />
            )}
          </button>

          {isSidebarOpen && (
            <button
              className="absolute right-3 top-3 lg:hidden flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={22} />
            </button>
          )}
        </div>

        {/* Menu Navigasi (Scrollable jika konten panjang) */}
        <nav className="mt-6 flex flex-col space-y-2 px-1 overflow-y-auto flex-grow pb-10">
          {navItems.map((item) => {
            const isActive = item.href === activeHash;
            const Icon = item.icon;
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                {/* --- ITEM UTAMA --- */}
                <a
                  href={item.href || '#'}
                  className={`flex items-center justify-between ${
                    isCollapsed ? "justify-center px-2" : "px-4"
                  } py-2 rounded-md transition cursor-pointer select-none
                  ${
                    isActive && !item.isDropdown
                      ? "bg-blue-100 text-blue-700 font-semibold border-r-4 border-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  onClick={(e) => handleLinkClick(e, item)}
                  title={item.name}
                >
                  <div className="flex items-center">
                    <Icon size={24} className={isCollapsed ? "mx-auto" : "mr-3"} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  
                  {/* Panah Dropdown (Hanya jika tidak collapsed & item dropdown) */}
                  {!isCollapsed && item.isDropdown && (
                    <div className="text-gray-400">
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </div>
                  )}
                </a>

                {/* --- SUB-MENU DROPDOWN --- */}
                {/* Hanya tampil jika tidak collapsed, item dropdown, dan state open true */}
                {!isCollapsed && item.isDropdown && isOpen && (
                  <div className="mt-1 ml-4 border-l-2 border-gray-200 pl-2 space-y-1 animate-slideDown">
                    {item.subItems.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDownload(sub.file, sub.name)} // Pass nama file
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <FileText size={16} className="mr-2" />
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
