import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.scss';
import pinkstoneIcon from '../assets/images/pinkstonelogo.webp';
import realcashIcon from '../assets/images/rc.webp';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const cardRefs = useRef([]);
  const cardRect = useRef(null);
  const [active, setActive] = useState(null);
  const [displayed, setDisplayed] = useState(null);

  const experiences = [
    {
      title: 'Freelance Web Developer',
      company: 'Autónomo',
      period: '2025 – Presente',
      location: 'Madrid',
      icon: '💼',
      color: '#a78bfa',
      achievements: [
        'Desarrollo integral de proyectos web para emprendedores y pequeñas empresas',
        'Diseño y desarrollo de sitios web responsive con HTML5, CSS3, JavaScript y React',
        'Gestión completa del ciclo de proyecto desde definición hasta entrega documentada',
        'Mejora de posicionamiento SEO y velocidad de carga',
        'Traducción de necesidades de negocio en soluciones digitales funcionales',
      ],
    },
    {
      title: 'Web Developer',
      company: 'PinkStone',
      period: '2026 (Prácticas)',
      location: 'Madrid',
      icon: pinkstoneIcon,
      color: '#f472b6',
      achievements: [
        'Desarrollo de soluciones web corporativas con foco en conversión',
        'Implementación y personalización de WordPress y PrestaShop',
        'Optimización SEO técnica y estructural',
        'Mejora de usabilidad y rendimiento orientada a incrementar retención',
      ],
    },
    {
      title: 'Gerente de Tienda',
      company: 'Real Cash',
      period: '2016 – 2023',
      location: 'Madrid',
      icon: realcashIcon,
      color: '#34d399',
      achievements: [
        'Liderazgo de equipo de 5 personas con responsabilidad en formación y desarrollo',
        'Gestión de operaciones anuales de hasta €3M',
        'Toma de decisiones estratégicas de compra y fijación de precios',
        'Implementación de mejoras que redujeron tiempos y aumentaron eficiencia',
        'Gestión de relaciones con clientes en situaciones complejas',
      ],
    },
  ];

  // ── Entrada inicial de las tarjetas con ScrollTrigger ──
  useEffect(() => {
    cardRefs.current.forEach((el) => {
      gsap.fromTo(el,
        {
          scrollTrigger: { trigger: el, start: 'top 80%' },
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: 'power3.out'
        }
        , { opacity: 1, x: 0 }

      );
    });
  }, []);

  // ── Abrir panel de detalle ──
  const openDetail = () => {
    const el = detailRef.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }
    );
    const items = el.querySelectorAll('.exp-detail__achievement');
/*     gsap.fromTo(items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 3.35, stagger: 0.07, ease: 'power2.out', delay: 0.2 }
    ); */
  };

  // ── Cerrar panel ──
  const closeDetail = (onComplete) => {
    const el = detailRef.current;
    if (!el) { onComplete?.(); return; }
    gsap.to(el, { opacity: 0, x: -20, duration: 0.25, ease: 'power2.in', onComplete }); 
    };

  // ── Click en una tarjeta / círculo ──
  const handleSelect = (index) => {
    // Deseleccionar: volver al estado de tarjetas
    if (active === index) {
      closeDetail(() => {
        setActive(null);
        setDisplayed(null);
        requestAnimationFrame(() => {
          cardRefs.current.forEach((card, i) => {
            gsap.fromTo(card,
              { scale: 0.8, opacity: 0.5 },
              { scale: 1, opacity: 1, duration: 0.4, delay: i * 0.08, ease: 'back.out(1.7)' }
            );
          });
        });
      });
      return;
    }

    // Micro-bounce en el elemento pulsado
    gsap.timeline()
      .to(cardRefs.current[index], { scale: 1.1, duration: 0.15, ease: 'power2.out' })
      .to(cardRefs.current[index], { scale: 1, duration: 0.2, ease: 'back.out(2)' });

    if (active !== null) {
      closeDetail(() => {
        setActive(index);
        setDisplayed(index);
        requestAnimationFrame(openDetail) 
      });
    } else {
      setActive(index);
      setDisplayed(index);
      requestAnimationFrame(() => {
        cardRefs.current.forEach((card, i) => {
          gsap.fromTo(card,
            { scale: 0.5, opacity: 0.0 },
            { scale: 1, opacity: 1, duration: 2.8, delay: i * 0.1, ease: 'back.out(4)' }
          );
        });
        openDetail();
      });
    }
  };

  const exp = displayed !== null ? experiences[displayed] : null;
  const isOpen = active !== null;

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Experiencia Profesional</h2>

        <div className={`experience__layout ${isOpen ? 'experience__layout--open' : ''}`}>

          {/* ── COLUMNA IZQUIERDA: tarjetas → círculos ── */}
          <div className={`experience__cards ${isOpen ? 'experience__cards--side' : ''}`}>
            {experiences.map((ex, i) => (
              <button
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`exp-card ${isOpen ? 'exp-card--circle' : ''} ${active === i ? 'exp-card--active' : ''}`}
                style={{ '--exp-color': ex.color }}
                onClick={() => handleSelect(i)}
                aria-label={`${ex.company} – ${ex.title}`}
              >
                {/* Vista TARJETA (estado inicial) */}
                <div className="exp-card__rect" ref={cardRect}>
                  <div className="exp-card__marker" />
                  <div className="exp-card__icon">
                    {typeof ex.icon === 'string' && !ex.icon.includes('.webp') ? (
                      <span>{ex.icon}</span>
                    ) : (
                      <img src={ex.icon} alt={ex.company} />
                    )}
                  </div>
                  <div className="exp-card__info">
                    <h3 className="exp-card__title">{ex.title}</h3>
                    <div className="exp-card__meta">
                      <span className="exp-card__company">{ex.company}</span>
                      <span className="sep">•</span>
                      <span>{ex.period}</span>
                      <span className="sep">•</span>
                      <span>{ex.location}</span>
                    </div>
                  </div>
                </div>

                {/* Vista CÍRCULO (estado seleccionado) */}
                <div className="exp-card__circle-inner">
                  <div className="exp-card__circle-icon">
                    {typeof ex.icon === 'string' && !ex.icon.includes('.webp') ? (
                      <span>{ex.icon}</span>
                    ) : (
                      <img src={ex.icon} alt={ex.company} />
                    )}
                  </div>
                  <span className="exp-card__circle-label">{ex.company}</span>
                  <span className="exp-card__circle-period">{ex.period}</span>
                </div>
              </button>
            ))}
          </div>

          {/* ── PANEL DE DETALLE (derecha) ── */}
          {exp && (
            <div
              className="exp-detail"
              ref={detailRef}
              style={{ '--exp-color': exp.color }}
            >
              <div className="exp-detail__header">
                <div className="exp-detail__icon">
                  {typeof exp.icon === 'string' && !exp.icon.includes('.webp') ? (
                    <span>{exp.icon}</span>
                  ) : (
                    <img src={exp.icon} alt={exp.company} />
                  )}
                </div>
                <div className="exp-detail__info">
                  <h3 className="exp-detail__title">{exp.title}</h3>
                  <div className="exp-detail__meta">
                    <span className="exp-detail__company">{exp.company}</span>
                    <span className="sep">•</span>
                    <span>{exp.period}</span>
                    <span className="sep">•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="exp-detail__achievements">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="exp-detail__achievement">
                    <span className="exp-detail__bullet">▹</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Experience;
