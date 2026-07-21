import { useMemo, useState } from 'react';
import Scroll from './animations/Scroll';
import './Projects.scss';

// Imágenes de proyectos (placeholders — sustituir por capturas reales de cada proyecto)
import projectImg2 from '../assets/images/b1.webp';
import projectImg3 from '../assets/images/bg-hero.png';
import projectImg4 from '../assets/images/cv.webp';
import projectImg5 from '../assets/images/diseño.png';
import projectImg6 from '../assets/images/pinkstone.png';
import projectImg7 from '../assets/images/ESLA.webp';
import projectImg8 from '../assets/images/IFP.webp';
import projectImg9 from '../assets/images/impulso-06.webp';

import { WorkIcon, Calendar, CarIcon, CvIcon, CupcakeIcon, ContentIcon, PruebasIcon} from './animations/svg';

// Iconos del stack tecnológico
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

const PROJECTS_PER_PAGE = 8;
const STACK_PER_PAGE = 25;

const projectsData = [
  { id: 1, title: 'Proyecto 1', media: WorkIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 2, title: 'Proyecto 2', media: Calendar, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 3, title: 'Proyecto 3', media: CarIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 4, title: 'Proyecto 4', media: CvIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 5, title: 'Proyecto 5', media: CupcakeIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 6, title: 'Proyecto 6', media: ContentIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 7, title: 'Proyecto 7', media: PruebasIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 8, title: 'Proyecto 8', media: CvIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
  { id: 9, title: 'Proyecto 9', media: CvIcon, description: 'Breve descripción del proyecto. Sustituye este texto por el resumen real.', links: [{ label: 'Ver Demo', href: '#' }, { label: 'Código', href: '#' }] },
];

const techStackData = [
  { id: 1, title: 'HTML5', image: htmlIcon },
  { id: 2, title: 'CSS3', image: cssIcon },
  { id: 3, title: 'JavaScript', image: jsIcon },
  { id: 4, title: 'React', image: reactIcon },
  { id: 5, title: 'Python', image: pythonIcon },
  { id: 6, title: 'C', image: cIcon },
  { id: 7, title: 'WordPress', image: wordpressIcon },
  { id: 8, title: 'Git & GitHub', image: githubIcon },
  { id: 9, title: 'Canva', image: canvaIcon },
  { id: 10, title: 'FileZilla', image: filezillaIcon },
  { id: 6, title: 'C', image: cIcon },
  { id: 7, title: 'WordPress', image: wordpressIcon },
  { id: 8, title: 'Git & GitHub', image: githubIcon },
  { id: 9, title: 'Canva', image: canvaIcon },
  { id: 10, title: 'FileZilla', image: filezillaIcon },
  
];

const chunk = (array, size) => {
  const pages = [];
  for (let i = 0; i < array.length; i += size) {
    pages.push(array.slice(i, i + size));
  }
  return pages.length ? pages : [[]];
};

const ArrowIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {direction === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projectsPage, setProjectsPage] = useState(0);
  const [stackPage, setStackPage] = useState(0);

  const projectPages = useMemo(() => chunk(projectsData, PROJECTS_PER_PAGE), []);
  const stackPages = useMemo(() => chunk(techStackData, STACK_PER_PAGE), []);

  const currentProjects = projectPages[projectsPage];
  const currentStack = stackPages[stackPage];

  const goPrevProjects = () => setProjectsPage((p) => (p - 1 + projectPages.length) % projectPages.length);
  const goNextProjects = () => setProjectsPage((p) => (p + 1) % projectPages.length);
  const goPrevStack = () => setStackPage((p) => (p - 1 + stackPages.length) % stackPages.length);
  const goNextStack = () => setStackPage((p) => (p + 1) % stackPages.length);

  return (
    <section className="projects section" id="projects">
      <Scroll />
      <div className="container">
        <h2 className="section-title">Proyectos</h2>

        <div className="projects__tabs" role="tablist">
          <span className={`projects__tabs-indicator projects__tabs-indicator--${activeTab}`} />
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'projects'}
            className={`projects__tab ${activeTab === 'projects' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Proyectos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'stack'}
            className={`projects__tab ${activeTab === 'stack' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('stack')}
          >
            Stack Tecnológico
          </button>
        </div>

        <div className="projects__panels">
          {/* Panel: Proyectos */}
          <div className={`projects__panel ${activeTab === 'projects' ? 'is-active' : ''}`}>
            <div className="projects__grid" key={`projects-page-${projectsPage}`}>
              {Array.from({ length: PROJECTS_PER_PAGE }).map((_, i) => {
                const project = currentProjects[i];
                if (!project) {
                  return <div key={`empty-${i}`} className="project-card project-card--empty" aria-hidden="true" />;
                }
                const Media = project.media;
                return (
                  <article key={project.id} className="project-card">
                    <div className="project-card__image">
                      {Media ? <Media /> : <img src={project.image} alt={project.title} loading="lazy" />}
                    </div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">{project.description}</p>
                    <div className="project-card__actions">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          className="project-card__btn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {projectPages.length > 1 && (
              <div className="projects__arrows">
                <button type="button" className="projects__arrow" onClick={goPrevProjects} aria-label="Proyectos anteriores">
                  <ArrowIcon direction="left" />
                </button>
                <button type="button" className="projects__arrow" onClick={goNextProjects} aria-label="Proyectos siguientes">
                  <ArrowIcon direction="right" />
                </button>
              </div>
            )}
          </div>

          {/* Panel: Stack Tecnológico */}
          <div className={`projects__panel ${activeTab === 'stack' ? 'is-active' : ''}`}>
            <div className="stack-panel">
              <div className="stack-grid" key={`stack-page-${stackPage}`}>
                {currentStack.map((tech) => (
                  <div key={tech.id} className="stack-card">
                    <div className="stack-card__image">
                      <img src={tech.image} alt={tech.title} loading="lazy" />
                    </div>
                    <h4 className="stack-card__title">{tech.title}</h4>
                  </div>
                ))}
              </div>

              {stackPages.length > 1 && (
                <div className="projects__arrows">
                  <button type="button" className="projects__arrow" onClick={goPrevStack} aria-label="Tecnologías anteriores">
                    <ArrowIcon direction="left" />
                  </button>
                  <button type="button" className="projects__arrow" onClick={goNextStack} aria-label="Tecnologías siguientes">
                    <ArrowIcon direction="right" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;