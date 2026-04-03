export const ENDPOINTS = {
  MAINTENANCE: "/settings/maintenance",
  DOSEN: "/dosen",
  DOSEN_LIST: (limit = 100) => `/dosen?limit=${limit}`,
  DOSEN_BY_ID: (id) => `/dosen/${id}`,
  PRESTASI: "/prestasi",
  PRESTASI_LIST: (limit = 100) => `/prestasi?limit=${limit}`,
  PRESTASI_BY_ID: (id) => `/prestasi/${id}`,
  BERITA: "/berita",
  BERITA_LIST: (limit = 100) => `/berita?limit=${limit}`,
  BERITA_BY_SLUG: (slug) => `/berita/slug/${slug}`,
  GALERI_LIST: (limit = 100) => `/galeri?limit=${limit}`,
  UNDUHAN_LIST: (limit = 100) => `/unduhan?limit=${limit}`,
};
