import { useState, useEffect } from "react";
import {
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
  Target,
  Download,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { PLACEHOLDERS } from "../../constants/placeholders";

const HASH_TO_ROUTE_MAP = {
  "#dosen": ROUTES.DOSEN,
  "#berita": ROUTES.BERITA,
  "#alumni": ROUTES.PRESTASI,
  "#galeri": ROUTES.GALERI,
  "#tentang": ROUTES.ABOUT,
  "#unduhan": ROUTES.UNDUHAN,
};

const ROUTE_TO_HASH_MAP = Object.fromEntries(
  Object.entries(HASH_TO_ROUTE_MAP).map(([hash, route]) => [route, hash])
);

const NAV_ITEMS = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Visi Misi", href: "#visi-misi", icon: Target },
  { name: "Tentang", href: "#tentang", icon: Info },
  { name: "Organisasi", href: "#organisasi", icon: Users },
  { name: "Dosen", href: "#dosen", icon: GraduationCap },
  { name: "Aslab", href: "#alumni", icon: Briefcase },
  { name: "Berita", href: "#berita", icon: Newspaper },
  { name: "Galeri", href: "#galeri", icon: Image },
  { name: "Unduhan", href: "#unduhan", icon: Download },
  { name: "Kontak", href: "#kontak", icon: Mail },
];

const Navbar = ({ onToggleCollapse }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash || "#home");
  const [openDropdown, setOpenDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === ROUTES.HOME;

  useEffect(() => {
    if (!isHomePage) {
      const matchingHash = Object.entries(ROUTE_TO_HASH_MAP).find(([route]) =>
        location.pathname.startsWith(route)
      );
      setActiveHash(matchingHash ? matchingHash[1] : "");
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
      { root: null, rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach((item) => {
      if (item.href?.startsWith("#")) {
        const section = document.querySelector(item.href);
        if (section) observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [isCollapsed, onToggleCollapse, isHomePage, location.pathname]);

  const handleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    setOpenDropdown(null);
    if (onToggleCollapse) onToggleCollapse(newState);
  };

  const handleLinkClick = (e, item) => {
    if (item.isDropdown) {
      e.preventDefault();
      setOpenDropdown(openDropdown === item.name ? null : item.name);
      return;
    }

    if (!isHomePage) {
      e.preventDefault();
      const targetRoute = HASH_TO_ROUTE_MAP[item.href];
      if (targetRoute) {
        navigate(targetRoute);
      } else {
        navigate(ROUTES.HOME);
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
    setIsSidebarOpen(false);
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName || "download");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        className={`fixed top-0 left-0 h-full ${sidebarWidthClass} shadow-xl z-40 bg-white transition-all duration-300 flex flex-col
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-blue-800 flex-shrink-0">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <img
                src="/Logo IFUPS.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDERS.LOGO_IF;
                }}
              />
              <img
                src="/WeAreIFUPS.svg"
                alt="Fakultas Teknik Informatika"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PLACEHOLDERS.LOGO_UPS;
                }}
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

        <nav className="mt-6 flex flex-col space-y-2 px-1 overflow-y-auto flex-grow pb-10">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === activeHash;
            const Icon = item.icon;
            const isOpen = openDropdown === item.name;

            return (
              <div key={item.name}>
                <a
                  href={item.href || "#"}
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
                    <Icon
                      size={24}
                      className={isCollapsed ? "mx-auto" : "mr-3"}
                    />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>

                  {!isCollapsed && item.isDropdown && (
                    <div className="text-gray-400">
                      {isOpen ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </div>
                  )}
                </a>

                {!isCollapsed && item.isDropdown && isOpen && (
                  <div className="mt-1 ml-4 border-l-2 border-gray-200 pl-2 space-y-1 animate-slideDown">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => handleDownload(sub.file, sub.name)}
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
        />
      )}
    </>
  );
};

export default Navbar;
