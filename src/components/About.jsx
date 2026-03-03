import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.scss';


const About = () => {
    return (
        <section className="about" id="about">
            <h2 className="section-title">Sobre mí</h2>
            <p className="about__text">
                Soy una desarrolladora web apasionada por crear experiencias digitales atractivas y funcionales. Con una sólida formación en diseño gráfico y desarrollo frontend, me especializo en transformar ideas en sitios web modernos y responsivos. Me encanta aprender nuevas tecnologías y enfrentar desafíos creativos para ofrecer soluciones innovadoras.
            </p>
        </section>
    );
};

export default About;
