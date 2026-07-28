import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Contact.scss';
import AboutImg from '../assets/images/About.webp';

const WHATSAPP_NUMBER = '34637901652';
const EMAIL_ADDRESS = 'gomezcarrasconieves@gmail.com';

const BackArrowIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#03030300"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z" fill="#0fd71c"></path> </g></svg>
);

const EmailIcon = () => (
  <svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path className="st0" d="M510.678,112.275c-2.308-11.626-7.463-22.265-14.662-31.054c-1.518-1.915-3.104-3.63-4.823-5.345 c-12.755-12.818-30.657-20.814-50.214-20.814H71.021c-19.557,0-37.395,7.996-50.21,20.814c-1.715,1.715-3.301,3.43-4.823,5.345 C8.785,90.009,3.63,100.649,1.386,112.275C0.464,116.762,0,121.399,0,126.087V385.92c0,9.968,2.114,19.55,5.884,28.203 c3.497,8.26,8.653,15.734,14.926,22.001c1.59,1.586,3.169,3.044,4.892,4.494c12.286,10.175,28.145,16.32,45.319,16.32h369.958 c17.18,0,33.108-6.145,45.323-16.384c1.718-1.386,3.305-2.844,4.891-4.43c6.27-6.267,11.425-13.741,14.994-22.001v-0.064 c3.769-8.653,5.812-18.171,5.812-28.138V126.087C512,121.399,511.543,116.762,510.678,112.275z M46.509,101.571 c6.345-6.338,14.866-10.175,24.512-10.175h369.958c9.646,0,18.242,3.837,24.512,10.175c1.122,1.129,2.179,2.387,3.112,3.637 L274.696,274.203c-5.348,4.687-11.954,7.002-18.696,7.002c-6.674,0-13.276-2.315-18.695-7.002L43.472,105.136 C44.33,103.886,45.387,102.7,46.509,101.571z M36.334,385.92V142.735L176.658,265.15L36.405,387.435 C36.334,386.971,36.334,386.449,36.334,385.92z M440.979,420.597H71.021c-6.281,0-12.158-1.651-17.174-4.552l147.978-128.959 l13.815,12.018c11.561,10.046,26.028,15.134,40.36,15.134c14.406,0,28.872-5.088,40.432-15.134l13.808-12.018l147.92,128.959 C453.137,418.946,447.26,420.597,440.979,420.597z M475.666,385.92c0,0.529,0,1.051-0.068,1.515L335.346,265.221L475.666,142.8 V385.92z"></path> </g> </g></svg>
);

// A partir de este ancho el bloque de contacto ya no se apila (columnas
// lado a lado); coincide con el breakpoint 'tablet' (≤1024) de _mixins.scss.
const SIDE_BY_SIDE_QUERY = '(min-width: 1025px)';

const Contact = () => {
  const [panel, setPanel] = useState('image'); // 'image' | 'whatsapp' | 'email'
  const [waMessage, setWaMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isSideBySide, setIsSideBySide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(SIDE_BY_SIDE_QUERY).matches
  );

  const panelRef = useRef(null);
  const isFirstRender = useRef(true);

  // En pantallas donde las columnas se apilan, el panel animado de la
  // derecha queda fuera de vista al pulsar el item de contacto (hay que
  // desplazarse para verlo), así que ahí usamos enlaces directos a
  // WhatsApp/email en vez de abrir el panel en la propia página.
  useEffect(() => {
    const mql = window.matchMedia(SIDE_BY_SIDE_QUERY);
    const handleChange = (e) => setIsSideBySide(e.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const handleSocialMouseMove = (evt) => {
    const link = evt.currentTarget;
    const spotlight = link.querySelector('.spotlight');
    const rect = link.getBoundingClientRect();
    const movX = evt.clientX - rect.x;

    gsap.to(spotlight, {
      x: movX,
      scale: 20,
      duration: 0.3
    });
  };

  const handleSocialMouseLeave = (evt) => {
    const link = evt.currentTarget;
    const spotlight = link.querySelector('.spotlight');

    gsap.to(spotlight, {
      scale: 0,
      duration: 0.3
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    gsap.fromTo(
      panelRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    );
  }, [panel]);

  const switchPanel = (nextPanel) => {
    if (nextPanel === panel) return;

    gsap.to(panelRef.current, {
      x: 60,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setPanel(nextPanel),
    });
  };

  const handleSendWhatsapp = () => {
    const text = encodeURIComponent(waMessage.trim());
    const url = `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${text}` : ''}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent('Hola, quiero conocerte!');
    const body = encodeURIComponent(emailMessage.trim());
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${subject}&body=${body}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
              {isSideBySide ? (
                <button
                  type="button"
                  className="contact__item"
                  onClick={() => switchPanel('whatsapp')}
                >
                  <span className="contact__icon">
                    <WhatsappIcon />
                  </span>
                  <div>
                    <span className="contact__label">WhatsApp</span>
                    <span className="contact__value">637 901 652</span>
                  </div>
                </button>
              ) : (
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__item"
                >
                  <span className="contact__icon">
                    <WhatsappIcon />
                  </span>
                  <div>
                    <span className="contact__label">WhatsApp</span>
                    <span className="contact__value">637 901 652</span>
                  </div>
                </a>
              )}

              {isSideBySide ? (
                <button
                  type="button"
                  className="contact__item"
                  onClick={() => switchPanel('email')}
                >
                  <span className="contact__icon">
                    <EmailIcon />
                  </span>
                  <div>
                    <span className="contact__label">Email</span>
                    <span className="contact__value">{EMAIL_ADDRESS}</span>
                  </div>
                </button>
              ) : (
                <a href={`mailto:${EMAIL_ADDRESS}`} className="contact__item">
                  <span className="contact__icon">
                    <EmailIcon />
                  </span>
                  <div>
                    <span className="contact__label">Email</span>
                    <span className="contact__value">{EMAIL_ADDRESS}</span>
                  </div>
                </a>
              )}
            </div>

            <div className="contact__social">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-btn"
                onMouseMove={handleSocialMouseMove}
                onMouseLeave={handleSocialMouseLeave}
              >
                <span className="spotlight"></span>
                <span>GitHub</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-btn"
                onMouseMove={handleSocialMouseMove}
                onMouseLeave={handleSocialMouseLeave}
              >
                <span className="spotlight"></span>
                <span>LinkedIn</span>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-btn"
                onMouseMove={handleSocialMouseMove}
                onMouseLeave={handleSocialMouseLeave}
              >
                <span className="spotlight"></span>
                <span>Portfolio</span>
              </a>
            </div>
          </div>

          <div className="contact__cta">
            <div className={`contact__cta-card ${panel === 'image' ? 'contact__cta-card--image' : ''}`}>
              <div className="contact__cta-panel" ref={panelRef}>
                {panel === 'image' && (
                  <img src={AboutImg} alt="Nieves Gómez" className="contact__cta-image" />
                )}

                {panel === 'whatsapp' && (
                  <div className="contact__compose">
                    <button
                      type="button"
                      className="contact__back"
                      onClick={() => switchPanel('image')}
                      aria-label="Volver"
                    >
                      <BackArrowIcon />
                    </button>
                    <h4>Escríbeme por WhatsApp</h4>
                    <textarea
                      className="contact__textarea"
                      placeholder="Escribe tu mensaje..."
                      value={waMessage}
                      onChange={(e) => setWaMessage(e.target.value)}
                    />
                    <button type="button" className="contact__send-btn" onClick={handleSendWhatsapp}>
                      Enviar
                    </button>
                  </div>
                )}

                {panel === 'email' && (
                  <div className="contact__compose">
                    <button
                      type="button"
                      className="contact__back"
                      onClick={() => switchPanel('image')}
                      aria-label="Volver"
                    >
                      <BackArrowIcon />
                    </button>
                    <h4>Escríbeme un email</h4>
                    <textarea
                      className="contact__textarea"
                      placeholder="Escribe tu mensaje..."
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                    />
                    <button type="button" className="contact__send-btn" onClick={handleSendEmail}>
                      Enviar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;