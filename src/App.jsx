import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import BeritaIndex from "./pages/berita/BeritaIndex";
import BeritaDetail from "./pages/berita/BeritaDetail";
import DosenIndex from "./pages/dosen/DosenIndex";
import DosenDetail from "./pages/dosen/DosenDetail";
import AlumniIndex from "./pages/alumni/AlumniIndex";
import AlumniDetail from "./pages/alumni/AlumniDetail";
import AboutIndex from "./pages/about/AboutIndex";
import GaleriIndex from "./pages/galeri/GaleriIndex";
import UnduhanIndex from "./pages/unduhan/UnduhanIndex";
import NotFound from "./pages/NotFound";
import { appSettings } from "./config/settings";
import apiClient from "./api/index";
import { ROUTES, FULL_SCREEN_PAGES } from "./constants/routes";
import { ENDPOINTS } from "./constants/endpoints";

const AppContent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isFullScreen = FULL_SCREEN_PAGES.some((path) =>
    location.pathname.startsWith(path)
  );

  const handleCollapseToggle = (collapsed) => {
    setIsCollapsed(collapsed);
  };

  const mainMarginClass = isFullScreen
    ? ""
    : isCollapsed
    ? "lg:ml-20"
    : "lg:ml-64";

  return (
    <div className="App bg-gray-50 min-h-screen">
      <ScrollToTop />

      {!isFullScreen && <Navbar onToggleCollapse={handleCollapseToggle} />}

      <main className={`transition-all duration-300 ${mainMarginClass}`}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MAINTENANCE} element={<Maintenance />} />
          <Route path={ROUTES.BERITA} element={<BeritaIndex />} />
          <Route path={`${ROUTES.BERITA}/:slug`} element={<BeritaDetail />} />
          <Route path={ROUTES.DOSEN} element={<DosenIndex />} />
          <Route path={`${ROUTES.DOSEN}/:id`} element={<DosenDetail />} />
          <Route path={ROUTES.PRESTASI} element={<AlumniIndex />} />
          <Route path={`${ROUTES.PRESTASI}/:id`} element={<AlumniDetail />} />
          <Route path={ROUTES.ABOUT} element={<AboutIndex />} />
          <Route path={ROUTES.GALERI} element={<GaleriIndex />} />
          <Route path={ROUTES.UNDUHAN} element={<UnduhanIndex />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
};

function App() {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMaintenanceStatus = async () => {
      try {
        const response = await apiClient.get(ENDPOINTS.MAINTENANCE);
        if (response.data?.success) {
          setIsMaintenanceMode(response.data.maintenance);
        }
      } catch {
        setIsMaintenanceMode(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkMaintenanceStatus();
  }, []);

  const isMaintenance =
    isMaintenanceMode ||
    import.meta.env.VITE_MAINTENANCE_MODE === "true" ||
    appSettings.maintenanceMode;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        {isMaintenance ? (
          <Routes>
            <Route path="*" element={<Maintenance />} />
          </Routes>
        ) : (
          <AppContent />
        )}
      </Router>
    </HelmetProvider>
  );
}

export default App;
