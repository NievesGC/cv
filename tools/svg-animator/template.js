// Plantilla del componente de icono generado. Replica exactamente la
// estructura de src/components/animations/svg/icons/WorkIcon.jsx (referencia
// canónica): mismos imports, mismo esqueleto de animateExtras, mismo wrapper
// div.svg-icon con el <svg> dentro.

// Indenta cada línea de código generado por IA al nivel del cuerpo de
// animateExtras (2 espacios), preservando su indentación relativa interna.
const indentCode = (code, indent = '  ') =>
  code
    .split('\n')
    .map((line) => (line.trim() ? `${indent}${line}` : line))
    .join('\n');

// Cuerpo de animateExtras. Si la IA generó un resultado válido (ver
// tools/svg-animator/ai-animator.js), se usa tal cual. Si no (sin partes
// animables, IA no disponible, error, respuesta inválida...), caemos al
// placeholder manual: una línea `.from(...)` TODO por cada id animable
// detectado, encadenadas igual que en WorkIcon.jsx, o un comentario de
// ejemplo (mismo estilo que icons/NewIcon.jsx) si no se detectó ninguna.
const buildAnimateExtrasBody = (animatableIds, aiAnimateExtras) => {
  if (aiAnimateExtras) {
    return `${indentCode(aiAnimateExtras)}\n`;
  }

  if (animatableIds.length === 0) {
    return (
      "  // TODO: no se detectaron ids animables en el SVG de origen.\n" +
      "  // tl.from('#miParte', { duration: 0.6, scale: 0, ease: 'back.out(4)' }, 0.2);\n"
    );
  }

  const lines = animatableIds.map((id) => `.from('#${id}', { /* TODO: animación */ }, 0)`);
  const chained = `tl${lines.join('\n    ')}`;

  return `  ${chained};\n`;
};

export const buildComponentSource = ({ componentName, svgId, svgJsx, animatableIds, aiAnimateExtras }) => {
  const animateExtrasBody = buildAnimateExtrasBody(animatableIds, aiAnimateExtras);
  const animateExtrasComment = aiAnimateExtras
    ? '// Animaciones propias del icono, además del trazado base que aplica useScrollDraw.\n' +
      '// Generadas por IA (tools/svg-animator/ai-animator.js): revisa el resultado antes de darlo por bueno.'
    : '// Animaciones propias del icono, además del trazado base que aplica useScrollDraw.\n' +
      '// Generado por tools/svg-animator: revisa y ajusta cada TODO antes de dar por bueno el icono.';

  return `import { useRef } from 'react';
import { useScrollDraw } from '../useScrollDraw';
import '../SvgIcon.scss';

const SVG_ID = '${svgId}';

${animateExtrasComment}
const animateExtras = (tl) => {
${animateExtrasBody}};

const ${componentName} = () => {
  const containerRef = useRef(null);

  useScrollDraw(containerRef, SVG_ID, animateExtras);

  return (
    <div className="svg-icon" ref={containerRef}>
${svgJsx}
    </div>
  );
};

export default ${componentName};
`;
};
