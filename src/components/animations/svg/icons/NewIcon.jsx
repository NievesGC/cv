import { useRef } from 'react';
import { useScrollDraw } from '../useScrollDraw';
import '../SvgIcon.scss';

const SVG_ID = 'icon-new';

// Animaciones propias de este icono, además del trazado base que ya aplica
// useScrollDraw a todo circle/path/line/polygon dentro de un <g>. Si no
// necesitas nada especial, borra esta función y no la pases al hook.
const animateExtras = (tl) => {
  // tl.from('#alguna-parte', { duration: 0.6, scale: 0, ease: 'back.out(4)' }, 0.2);
};

const NewIcon = () => {
  const containerRef = useRef(null);

  useScrollDraw(containerRef, SVG_ID, animateExtras);

  return (
    <div className="svg-icon" ref={containerRef}>
      <svg
        className="svg-icon__svg"
        id={SVG_ID}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        {/* Pega aquí el contenido de tu SVG (todo lo que va dentro de <svg>...</svg>) */}
      </svg>
    </div>
  );
};

export default NewIcon;

/*
 * ══════════════════════════════════════════════════════════════════
 * CÓMO AÑADIR UN NUEVO ICONO SVG ANIMADO AL SCROLL
 * ══════════════════════════════════════════════════════════════════
 *
 * 1. Copia este archivo dentro de esta misma carpeta (svg/icons/) y
 *    renómbralo con el nombre de tu icono, p. ej. MiIcono.jsx.
 *
 * 2. Cambia SVG_ID por un id único que no exista ya en otro icono de
 *    esta carpeta. Se usa para que useScrollDraw sepa a qué SVG
 *    apuntar (el ScrollTrigger y el dibujado del trazo dependen de
 *    que sea único en toda la página).
 *
 * 3. Pega el markup de tu SVG dentro de <svg>...</svg>, ajustando:
 *      - viewBox            → el de tu SVG original.
 *      - class="..."        → className="..."
 *      - xlink:href="..."   → xlinkHref="..."
 *      - style="a:b;c:d;"   → style={{ a: 'b', c: 'd' }}
 *                              (propiedades CSS en camelCase: stroke-width
 *                              → strokeWidth, clip-path → clipPath, etc.)
 *      - En vez de un color fijo (fill:"#FFFFFF", stroke:"#3A3C41"...),
 *        usa fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)'.
 *        Así el color de TODOS los iconos (incluido este) sale del
 *        bloque de ajustes que hay al principio de SvgIcon.scss.
 *      - Revisa que los ids internos (defs, clipPath...) no choquen
 *        con los de otros iconos ya existentes; si hace falta,
 *        renómbralos añadiendo un sufijo propio del icono.
 *
 * 4. useScrollDraw ya anima el trazado (drawSVG 0% → 100%) de
 *    circle/path/line/polygon cuando el icono entra en el viewport.
 *    Si quieres animaciones adicionales (partes que aparecen, giran,
 *    rebotan...), añádelas dentro de animateExtras usando los ids de
 *    tus elementos. Si no necesitas nada más, elimina animateExtras
 *    y llama a useScrollDraw(containerRef, SVG_ID) sin tercer
 *    argumento.
 *
 * 5. Regístralo en el barrel svg/index.js añadiendo una línea:
 *      export { default as MiIcono } from './MiIcono';
 *
 * 6. Impórtalo donde lo necesites igual que WorkIcon:
 *      import { MiIcono } from './animations/svg';
 *      ...
 *      <MiIcono />
 *
 * El contenedor .svg-icon (definido en SvgIcon.scss) ya resuelve
 * tamaño, centrado y fondo — no hace falta CSS propio salvo que
 * quieras personalizar algo específico de este icono.
 *
 * COLOR Y TAMAÑO: se ajustan todos juntos, para todos los iconos,
 * en el bloque marcado al principio de SvgIcon.scss
 * (--svg-icon-fill, --svg-icon-stroke, --svg-icon-size). Cambia esos
 * tres valores ahí si quieres otro color o otro tamaño de trazo —
 * no hace falta tocar nada en este componente.
 * ══════════════════════════════════════════════════════════════════
 */
