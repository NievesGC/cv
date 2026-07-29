import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/App.scss';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  // Las secciones calculan sus posiciones de scroll (ScrollTrigger) tan
  // pronto se montan, pero las imágenes pueden seguir cargando y cambiar el
  // alto real de la página después. Sin este refresco, eso deja huecos o
  // animaciones que nunca llegan a dispararse.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();

    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
      return () => window.removeEventListener('load', refresh);
    }
  }, []);

  return (
    <div className="app">

      {/* 🎨 Fondo kaleidoscopio — capa decorativa detrás de todo */}
      <div className="kaleidoscope"></div>

      {/* Navegación */}
      <Header />

      {/* Secciones principales */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer>
        <div className="copyright">
          <span>&copy; <span className="year">2025</span></span>
          <span>Diseñado con</span>
          <span className="heart">&hearts;</span>
          <span>por Nieves Gómez</span>
          <span>– Todos los derechos reservados</span>
        </div>

      </footer >
    </div >
  );
}

export default App;
