import Hero from '../sections/Hero';
import VisiMisi from '../sections/VisiMisi';
import About from '../sections/About';
import Organisasi from '../sections/Organisasi';
import Dosen from '../sections/Dosen';
import Alumni from '../sections/Alumni';
import Berita from '../sections/Berita';
import Kontak from '../sections/Kontak';
import Galeri from "../sections/Galeri";
import Unduhan from "../sections/Unduhan";
import SEO from "../components/SEO";

const Home = () => {
  return (
    <main>
      <SEO />
      <Hero />
      <VisiMisi />
      <About />
      <Organisasi />
      <Dosen />
      <Alumni />
      <Berita />
      <Galeri />
      <Unduhan />
      <Kontak />
    </main>
  );
};

export default Home;