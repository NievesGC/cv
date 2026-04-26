import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import './About.scss';
import AboutImg from '../assets/images/About.webp'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const About = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const descRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {

        const ctx = gsap.context(() => {

            gsap.fromTo(imageRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            gsap.fromTo(descRef.current,
                { x: -60, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );


            let split = SplitText.create(".section-title", { type: "lines" });

            gsap.from(split.lines, {
                rotationX: -100,
                transformOrigin: "50% 50% -160px",
                opacity: 0,
                duration: 0.6,
                ease: "power3",
                stagger: 0.25,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            })

            // Timeline entra desde abajo
            gsap.fromTo(timelineRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            /*   document.fonts.ready.then(() => {
                  const descRefs = [desc1Ref, desc2Ref];
                  descRefs.forEach((descRef) => {
                      const split = SplitText.create(descRef.current, { type: 'words' });
  
                      gsap.set(descRef.current, {
                          transformPerspective: 600,
                          perspective: 300,
                          transformStyle: 'preserve-3d',
                          autoAlpha: 1
                      });
  
                      gsap.to(descRef.current, {
                          autoAlpha: 1,
                          duration: 0,
                          scrollTrigger: {
                              trigger: descRef.current,
                              start: 'top 80%',
                              toggleActions: 'play none none reverse'
                          }
                      });
  
                      split.words.forEach((word, i) => {
                          gsap.from(word, {
                              z: () => gsap.utils.random(-500, 300),
                              scale: 2,
                              opacity: 0,
                              rotationY: () => gsap.utils.random(-40, 40),
                              rotationX: () => gsap.utils.random(-20, 20),
                              duration: 1,
                              ease: 'power3.out',
                              scrollTrigger: {
                                  trigger: descRef.current,
                                  start: 'top 70%',
                                  toggleActions: 'play none none reverse'
                              },
                              delay: i * 0.05
                          });
  
                          gsap.to(split.words, {
                              z: 300,
                              scale: 0.5,
                              opacity: 0,
                              rotationY: () => gsap.utils.random(-40, 40),
                              rotationX: () => gsap.utils.random(-20, 20),
                              duration: 0.2,
                              stagger: 0.03,
                              ease: 'power2.in',
                              scrollTrigger: {
                                  trigger: descRef.current,
                                  start: 'bottom 30%',
                                  toggleActions: 'play none none reverse'
                              }
                          });
                      });
                  });
  
              }); */
        }, sectionRef);

        return () => ctx.revert(); // limpieza al desmontar

    }, []);

    return (
        <section className="about section" ref={sectionRef}>

            <img
                className="image"
                src={AboutImg}
                ref={imageRef}
                alt="dibujo nieves gomez"
            />

            {/* Título — igual que antes */}
            <h2 className="section-title" ref={titleRef}>Perfil Profesional</h2>

            {/* NUEVO: tarjeta oscura con los párrafos */}
            <div className="about__desc-card" ref={descRef}>
                <p className="about__description">
                    He desarrollado mi carrera combinando liderazgo operativo con capacidad analítica
                    y formación técnica en desarrollo, aplicando una{' '}
                    <b>mentalidad orientada a resultados</b> tanto en gestión como en programación.
                </p>
                <p className="about__description">
                    Experiencia en la toma de <b>decisiones estratégicas</b> bajo presión,
                    planificación, organización y <b>optimización de procesos</b>,
                    comunicación efectiva con equipos y clientes.
                </p>
            </div>





            {/* NUEVO: timeline a la derecha */}
            <div className="about__timeline" ref={timelineRef}>

                <div className="about__timeline-item">
                    <span className="about__year current">Actualidad</span>
                    <ul>
                        <li>Máster en Desarrollo con Inteligencia Artificial
                            <b className="about__school"> · Big School</b>
                        </li>
                    </ul>
                </div>

                <div className="about__timeline-item">
                    <span className="about__year">2025</span>
                    <ul>
                        <li>Certificación Profesional Web Developer
                            <b className="about__school"> · Big School</b>
                        </li>
                        <li>Cursos complementarios
                            <ul className="about__sublist">  {/* 👈 ul intermedio para que sea válido */}
                                <li><b className="about__school"> · Gestor de Sitios Web – Impulso 06</b></li>
                                <li><b className="about__school"> · Fundamentos de C - 42 Telefónica</b></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="about__timeline-item">
                    <span className="about__year">2023</span>
                    <ul>
                        <li>Certificación Profesional Web Developer
                            <b className="about__school"> · Big School</b>
                        </li>
                    </ul>
                </div>

                <div className="about__timeline-item">
                    <span className="about__year">2019</span>
                    <ul>
                        <li>Certificación Profesional Web Developer
                            <b className="about__school"> · Big School</b>
                        </li>
                    </ul>
                </div>

            </div>


        </section>
    );
};

export default About;