export const allGallery = [
  {
    id: 1,
    title: "Seminar Nasional Teknologi Informasi",
    category: "Seminar",
    image: "/images/galeri/seminar1.jpg",
    date: "10 Agustus 2024",
    description: "Seminar Nasional Teknologi Informasi 2024 menghadirkan pembicara ahli dari industri dan akademisi untuk membahas tren terbaru dalam AI dan Cyber Security. Acara ini dihadiri oleh lebih dari 500 peserta dari berbagai universitas."
  },
  {
    id: 2,
    title: "Kunjungan Industri ke Jakarta",
    category: "Kunjungan",
    image: "/images/galeri/kunjungan1.jpg",
    date: "25 Juli 2024",
    description: "Mahasiswa semester 6 melakukan kunjungan industri ke beberapa perusahaan teknologi unicorn di Jakarta untuk melihat langsung budaya kerja dan penerapan teknologi skala besar."
  },
  {
    id: 3,
    title: "Workshop UI/UX Design",
    category: "Workshop",
    image: "/images/galeri/workshop1.jpg",
    date: "15 Juni 2024",
    description: "Workshop intensif selama dua hari yang membahas prinsip dasar desain antarmuka dan pengalaman pengguna, menggunakan tools industri terkini seperti Figma."
  },
  {
    id: 4,
    title: "Kompetisi Coding Internal",
    category: "Kompetisi",
    image: "/images/galeri/lomba1.jpg",
    date: "20 Mei 2024",
    description: "Ajang kompetisi pemrograman tahunan bagi mahasiswa internal untuk mengasah kemampuan problem solving dan algoritma dalam lingkungan yang kompetitif namun suportif."
  },
  {
    id: 5,
    title: "Wisuda Periode Genap 2023/2024",
    category: "Wisuda",
    image: "/images/galeri/wisuda1.jpg",
    date: "05 April 2024",
    description: "Momen membahagiakan pelepasan lulusan terbaik Prodi Informatika. Selamat kepada para wisudawan yang telah menyelesaikan masa studinya dengan gemilang."
  },
  {
    id: 6,
    title: "Pengabdian Masyarakat di Desa Binaan",
    category: "Pengabdian",
    image: "/images/galeri/abdimas1.jpg",
    date: "10 Maret 2024",
    description: "Kegiatan sosial mahasiswa dan dosen dalam memberikan pelatihan literasi digital kepada masyarakat desa binaan sebagai bentuk implementasi tridharma perguruan tinggi."
  },
];

export const galleryCategories = ["Semua", ...new Set(allGallery.map(item => item.category))];