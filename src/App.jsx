import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Morphology from './pages/Morphology.jsx';
import Nutrition from './pages/Nutrition.jsx';
import Population from './pages/Population.jsx';
import Photo from './pages/Photo.jsx';
import Search from './pages/Search.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morphology" element={<Morphology />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/population" element={<Population />} />
          <Route path="/photo" element={<Photo />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
