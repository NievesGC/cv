import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Education.scss';
import bigSchoolIcon from '../assets/images/big_school_logo.webp';
import keepCodingIcon from '../assets/images/keepcoding.webp';
import eslaIcon from '../assets/images/ESLA.webp';
import ifpIcon from '../assets/images/IFP.webp';
import f42Icon from '../assets/images/42.webp';
import impulsoIcon from '../assets/images/impulso-06.webp';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  const education = [
    {
      title: 'Máster en Desarrollo con Inteligencia Artificial',
      institution: 'Big School',
      period: '2025 – Actualidad',
      icon: bigSchoolIcon
    },
    {
      title: 'Full Stack Jr Bootcamp',
      institution: 'KeepCoding',
      period: '2023',
      icon: keepCodingIcon
    },
    {
      title: 'Certificación Profesional Web Developer',
      institution: 'Esla',
      period: '2025',
      icon: eslaIcon
    },
    {
      title: 'Técnico Superior en Administración y Finanzas',
      institution: 'IFP',
      period: '2017 – 2019',
      icon: ifpIcon
    },
    {
      title: 'Piscine Discovery Python - Women\'s Edition',
      institution: '42 Madrid - Fundación Telefónica',
      period: '2025',
      icon: f42Icon
    },
    {
      title: 'Cursos Complementarios',
      institution: 'Impulso 06 & Otros',
      period: 'Varios',
      icon: impulsoIcon,
      description: 'Python, C y desarrollo con IA'
    }
  ];

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.education-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      opacity: 1,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="education section" id="education" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Formación Académica</h2>
        
        <div className="education__grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-card__icon">
                <img src={edu.icon} alt={edu.institution} />
              </div>
              <div className="education-card__content">
                <h3 className="education-card__title">{edu.title}</h3>
                <div className="education-card__institution">{edu.institution}</div>
                <div className="education-card__period">{edu.period}</div>
                {edu.description && (
                  <p className="education-card__description">{edu.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
