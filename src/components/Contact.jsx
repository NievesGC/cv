import './Contact.scss';

const Contact = () => {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2 className="section-title">Contacto</h2>
        
        <div className="contact__content">
          <div className="contact__info">
            <h3 className="contact__subtitle">¿Hablamos?</h3>
            <p className="contact__description">
              Estoy disponible para nuevas oportunidades como Junior Developer. 
              Si buscas a alguien con visión de negocio y capacidad técnica en evolución, 
              estaré encantada de conversar.
            </p>

            <div className="contact__details">
              <a href="tel:+34637901652" className="contact__item">
                <span className="contact__icon">📞</span>
                <div>
                  <span className="contact__label">Teléfono</span>
                  <span className="contact__value">637 901 652</span>
                </div>
              </a>

              <a href="mailto:gomezcarrasconieves@gmail.com" className="contact__item">
                <span className="contact__icon">📧</span>
                <div>
                  <span className="contact__label">Email</span>
                  <span className="contact__value">gomezcarrasconieves@gmail.com</span>
                </div>
              </a>

              <div className="contact__item">
                <span className="contact__icon">📍</span>
                <div>
                  <span className="contact__label">Ubicación</span>
                  <span className="contact__value">Madrid, España</span>
                </div>
              </div>
            </div>

            <div className="contact__social">
              <a href="#" target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                GitHub
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                LinkedIn
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="contact__social-btn">
                Portfolio
              </a>
            </div>
          </div>

          <div className="contact__cta">
            <div className="contact__cta-card">
              <h4>¿Por qué trabajar conmigo?</h4>
              <ul>
                <li>✓ 7+ años de experiencia en liderazgo y gestión</li>
                <li>✓ Formación técnica actualizada en desarrollo web</li>
                <li>✓ Visión de negocio aplicada a la tecnología</li>
                <li>✓ Mentalidad orientada a resultados</li>
                <li>✓ Capacidad de aprendizaje continuo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
