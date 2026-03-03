import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import './styles/App.scss';

function App() {
  return (
    <div className="app">
      {/* Formas geométricas decorativas de fondo */}
      <div className="geometric-shapes">
        <div className="shape hexagon-1"></div>
        <div className="shape hexagon-2"></div>
        <div className="shape triangle-1"></div>
        <div className="shape triangle-2"></div>
      </div>

      {/* Navegación */}
      <Header />

      {/* Secciones principales */}
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        backgroundColor: '#1a1a1a', 
        color: '#fff',
        fontSize: '0.875rem'
      }}>
        <p>© 2025 Nieves Gómez Carrasco - Todos los derechos reservados</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.7 }}>
          Hecho con React, Vite, GSAP y Sass ❤️
        </p>
      </footer>
    </div>
  );
}

export default App;
