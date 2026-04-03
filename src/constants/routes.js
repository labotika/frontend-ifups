export const ROUTES = {
  HOME: "/",
  MAINTENANCE: "/maintenance",
  BERITA: "/berita",
  BERITA_DETAIL: (slug) => `/berita/${slug}`,
  DOSEN: "/dosen",
  DOSEN_DETAIL: (id) => `/dosen/${id}`,
  PRESTASI: "/prestasi",
  ABOUT: "/about",
  GALERI: "/galeri",
  UNDUHAN: "/unduhan",
};

export const FULL_SCREEN_PAGES = [
  ROUTES.BERITA,
  ROUTES.DOSEN,
  ROUTES.PRESTASI,
  ROUTES.ABOUT,
  ROUTES.GALERI,
  ROUTES.UNDUHAN,
];
