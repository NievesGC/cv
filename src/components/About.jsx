import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText, ScrollTrigger } from 'gsap/all';
import './About.scss';
import AboutImg from '../assets/images/About.webp'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

const About = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null)
    const imageRef = useRef(null);
    const desc1Ref = useRef(null);
    const desc2Ref = useRef(null);
    const blindOverlayRef = useRef(null);


    useEffect(() => {

        // --- PERSIANAS FUERA DEL CONTEXTO ---
        const overlay = blindOverlayRef.current;
        const numBlinds = 20;
        overlay.innerHTML = '';

        for (let i = 0; i < numBlinds; i++) {
            const blind = document.createElement('div');
            blind.className = 'about__blind';
            blind.style.width = `${100 / numBlinds}%`;
            blind.style.left = `${i * (100 / numBlinds)}%`;
            overlay.appendChild(blind);
        }

        const blinds = overlay.querySelectorAll('.about__blind');

        const blindAnimation = gsap.fromTo(
            blinds,
            { scaleX: 1 },
            {
                scaleX: 0,
                stagger: { each: 0.1, ease: 'power2.inOut' },
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top 30%',
                    scrub: 1,
                },
            }
        );

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


            gsap.fromTo(titleRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );



            document.fonts.ready.then(() => {
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
                            duration: 0.4,
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

            });
        }, sectionRef);

        return () => ctx.revert(); // limpieza al desmontar

    }, []);

    return (
        <section className="about" ref={sectionRef}>
            <h2 className="about__title" ref={titleRef}>Perfil Profesional</h2>
            <div className='container'>
                <div className="about__profile">
                    <p className="about__description" ref={desc1Ref}>
                        He desarrollado mi carrera combinando liderazgo operativo con capacidad analítica y formación técnica en desarrollo, aplicando una <b>mentalidad orientada a resultados</b> tanto en gestión como en programación.
                    </p>
                    <p className="about__description" ref={desc2Ref}>
                        Experiencia en la toma de <b>decisiones estratégicas</b> bajo presión, planificación, organización y <b>optimización de procesos</b> comunicación efectiva con equipos y clientes.
                    </p></div>
                <img className='about__image' src={AboutImg} ref={imageRef} alt="dibujo nieves gomez" />
            </div>

            <div className="about__blind-overlay" ref={blindOverlayRef}></div>
        </section>
    );
};

export default About;