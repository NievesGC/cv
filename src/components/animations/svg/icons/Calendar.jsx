import { useRef } from 'react';
import { useScrollDraw } from '../useScrollDraw';
import '../SvgIcon.scss';

const SVG_ID = 'icon-calendar';

// Animaciones propias del icono, además del trazado base que aplica
// useScrollDraw (dibuja el contorno de líneas, anillas y el check).
const animateExtras = (tl) => {
  tl.from('#ring1', { duration: 0.4, scaleY: 0, transformOrigin: '50% 0%', ease: 'back.out(3)' }, 0)
    .from('#ring2', { duration: 0.4, scaleY: 0, transformOrigin: '50% 0%', ease: 'back.out(3)' }, 0.08)
    .from('.calendar-day', {
      duration: 0.4,
      scale: 0,
      transformOrigin: '50% 50%',
      ease: 'back.out(4)',
      stagger: 0.04,
    }, 0.5)
    .from('#check', { duration: 0.4, repeat: -1, yoyo: true, repeatDelay: 0.2, scale: 0, transformOrigin: '50% 50%', ease: 'back.out(4)' }, '-=0.1');
};

const Calendar = () => {
  const containerRef = useRef(null);

  useScrollDraw(containerRef, SVG_ID, animateExtras);

  return (
    <div className="svg-icon" ref={containerRef}>
      <svg
        version="1.1"
        className="svg-icon__svg"
        id={SVG_ID}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ enableBackground: 'new 0 0 512 512' }}
        xmlSpace="preserve"
      >
        {/* Cuerpo del calendario (rectángulo redondeado) */}
        <rect
          x="72"
          y="94"
          width="368"
          height="342"
          rx="48"
          style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '14', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
        />

        {/* Línea que separa la cabecera del cuerpo (agrupada para que el trazo base la dibuje) */}
        <g id="header">
          <line
            x1="72"
            y1="190"
            x2="440"
            y2="190"
            style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '12', strokeMiterlimit: '10' }}
          />
        </g>

        {/* Anillas superiores (las dos patitas del calendario) */}
        <g id="rings">
          <line id="ring1" x1="158" y1="62" x2="158" y2="124" style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '14', strokeLinecap: 'round', strokeMiterlimit: '10' }} />
          <line id="ring2" x1="354" y1="62" x2="354" y2="124" style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '14', strokeLinecap: 'round', strokeMiterlimit: '10' }} />
        </g>

        {/* Fila 1 de días (4 cuadrados) */}
        <g id="row1">
          <rect className="calendar-day" x="176" y="230" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="246" y="230" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="316" y="230" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="386" y="230" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
        </g>

        {/* Fila 2 de días (4 cuadrados + check al final) */}
        <g id="row2">
          <rect className="calendar-day" x="106" y="298" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="176" y="298" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="246" y="298" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="316" y="298" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          {/* El check del día marcado */}
          <polyline
            id="check"
            points="384,314 396,330 428,304"
            style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '13', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
          />
        </g>

        {/* Fila 3 de días (5 cuadrados) */}
        <g id="row3">
          <rect className="calendar-day" x="106" y="366" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="176" y="366" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="246" y="366" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="316" y="366" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
          <rect className="calendar-day" x="386" y="366" width="34" height="34" style={{ fill: 'var(--svg-icon-stroke)' }} />
        </g>
      </svg>
    </div>
  );
};

export default Calendar;
