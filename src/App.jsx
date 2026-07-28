import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './styles/App.scss';
import './App.css';

function App() {
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
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontSize: '0.875rem'
      }}>
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
