import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.scss';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const socialRef = useRef(null);
  const infoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(titleRef.current,
      { opacity: 0, y: -60 },
      { opacity: 1, y: 80, duration: 1.2, ease: 'power4.out' }
    )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 80, x: -60 },
        { opacity: 1, y: 80, x: 0, duration: 1.2, ease: 'power4.out' }
        , '<')

      .fromTo(socialRef.current,
        { opacity: 0, y: 150, scale: 0 },
        { opacity: 1, y: 200 ,scale: 1, duration: 1, ease: 'power1.out' }
        , '<'
        )

      .fromTo(infoRef.current,
        { opacity: 0, y: 350, x : 150 },
        { opacity: 1, y: 350 , x: 0, duration: 0.6, ease: 'power1.out' }
        , '<'
        )

  }, []);
  
const handleMouseMove = (evt, i) => {
  const rect = linkRefs.current[i].getBoundingClientRect();
  const movX = evt.clientX - rect.x;

  gsap.to(spotlightRefs.current[i], {
    x: movX,
    scale: 30,
    duration: 0.3
  });
};

const handleMouseLeave = (evt) => {
  const rect = socialRef.current.getBoundingClientRect();
  const movX = evt.clientX - rect.x;

  gsap.to(spotlightRef.current, {
    x: movX,
    scale: 0,
    duration: 0.3
  });
};

  const scrollToContact = (e) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToProjects = (e) => {
    e.preventDefault();
    document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className='background'>
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title" ref={titleRef}>
              <span className="hero__title-name">Nieves Gómez Carrasco</span>
            </h1>

            <h2 className="hero__subtitle" ref={subtitleRef}>
              Junior Developer <span className="separator">|</span> Senior en Gestión de Equipos y Operaciones
            </h2>


            <div className="hero__social" ref={socialRef}>
              <a onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} href="#" target="_blank" rel="noopener noreferrer" className="hero__social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="spotlight" >GitHub</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hero__social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hero__social-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2 15h4v-10h-4v10zm6-11h4v10h-4v-10zm-8 0h-4v10h4v-10z" />
                </svg>
                <span>Portfolio</span>
              </a>
            </div>

            <div className="hero__info" ref={infoRef}>
              <div className="hero__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>

                <span>Madrid</span>
              </div>
              <div className="hero__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>637 901 652</span>
              </div>
              <div className="hero__info-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
                <span>gomezcarrasconieves@gmail.com</span>
              </div>
            </div>


          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
