import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.scss';

// Importar imágenes
import htmlIcon from '../assets/images/html5.webp';
import cssIcon from '../assets/images/css.webp';
import jsIcon from '../assets/images/js.webp';
import reactIcon from '../assets/images/rc.webp';
import pythonIcon from '../assets/images/python.webp';
import cIcon from '../assets/images/c.webp';
import wordpressIcon from '../assets/images/Wordpress.webp';
import githubIcon from '../assets/images/github-mark.webp';
import canvaIcon from '../assets/images/canva.webp';
import filezillaIcon from '../assets/images/firezilla.webp';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);

  const skillsData = {
    frontend: [
      { name: 'HTML5', icon: htmlIcon, level: 90 },
      { name: 'CSS3', icon: cssIcon, level: 85 },
      { name: 'JavaScript', icon: jsIcon, level: 80 },
      { name: 'React', icon: reactIcon, level: 75 },
    ],
    backend: [
      { name: 'Python', icon: pythonIcon, level: 70 },
      { name: 'C', icon: cIcon, level: 60 },
    ],
    tools: [
      { name: 'WordPress', icon: wordpressIcon, level: 85 },
      { name: 'Git/GitHub', icon: githubIcon, level: 80 },
      { name: 'Canva', icon: canvaIcon, level: 90 },
      { name: 'FileZilla', icon: filezillaIcon, level: 85 },
    ]
  };

  const softSkills = [
    'Liderazgo de Equipos',
    'Gestión Operativa',
    'Toma de Decisiones',
    'Resolución de Problemas',
    'Comunicación Efectiva',
    'Análisis de Datos',
    'Planificación Estratégica',
    'Trabajo Bajo Presión'
  ];

  useEffect(() => {
    const skillCards = skillsRef.current.querySelectorAll('.skill-card');
    
    gsap.from(skillCards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      opacity: 1,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        
        <div className="skills__content" ref={skillsRef}>
          {/* Frontend Skills */}
          <div className="skills__category">
            <h3 className="skills__category-title">
              <span className="icon">💻</span>
              Desarrollo Web Frontend
            </h3>
            <div className="skills__grid">
              {skillsData.frontend.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card__icon">
                    <img src={skill.icon} alt={skill.name} />
                  </div>
                  <h4 className="skill-card__name">{skill.name}</h4>
                  <div className="skill-card__progress">
                    <div 
                      className="skill-card__progress-bar" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-card__level">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="skills__category">
            <h3 className="skills__category-title">
              <span className="icon">⚙️</span>
              Backend (En Evolución)
            </h3>
            <div className="skills__grid">
              {skillsData.backend.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card__icon">
                    <img src={skill.icon} alt={skill.name} />
                  </div>
                  <h4 className="skill-card__name">{skill.name}</h4>
                  <div className="skill-card__progress">
                    <div 
                      className="skill-card__progress-bar" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-card__level">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="skills__category">
            <h3 className="skills__category-title">
              <span className="icon">🛠️</span>
              Herramientas y CMS
            </h3>
            <div className="skills__grid">
              {skillsData.tools.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-card__icon">
                    <img src={skill.icon} alt={skill.name} />
                  </div>
                  <h4 className="skill-card__name">{skill.name}</h4>
                  <div className="skill-card__progress">
                    <div 
                      className="skill-card__progress-bar" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="skill-card__level">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skills__category skills__category--full">
            <h3 className="skills__category-title">
              <span className="icon">🌟</span>
              Habilidades Profesionales
            </h3>
            <div className="soft-skills">
              {softSkills.map((skill, index) => (
                <div key={index} className="soft-skill-badge">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
