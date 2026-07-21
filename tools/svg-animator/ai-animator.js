// Paso opcional del pipeline de tools/svg-animator: genera el cuerpo de
// animateExtras (animaciones GSAP de ENTRADA) llamando a la CLI de Claude
// Code, a partir de las partes animables detectadas en el SVG ya optimizado
// por SVGO (mismo paso que hoy alimenta el placeholder TODO en template.js).
//
// Este módulo NUNCA modifica el SVG: solo lo lee para construir una lista de
// selectores ya listos para usar en GSAP, y le pide a la IA que escriba
// animateExtras usando exclusivamente esos selectores. Si algo falla (CLI no
// disponible, timeout, respuesta inválida...) devuelve null y quien llama
// cae al placeholder manual de siempre: nunca rompe la generación del icono.
import { execFileSync } from 'node:child_process';

const DRAWABLE_TAGS = ['circle', 'path', 'line', 'polygon', 'polyline'];

// Recorre etiquetas de apertura/cierre de forma ingenua (igual de "no es un
// parser XML completo" que el resto de tools/svg-animator): asume que el
// SVG optimizado por SVGO no trae "<"/">" dentro de valores de atributo,
// lo cual es cierto para lo que produce SVGO.
const TAG_RE = /<(\/?)([a-zA-Z][\w:-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;
const ID_RE = /\bid="([^"]+)"/;

// Mismo criterio que isTechnicalId en index.js (SVGID_* de Illustrator,
// clipPath, el propio id del <svg> raíz): se duplica aquí a propósito, en
// vez de importarlo, para no crear un import circular entre index.js y este
// módulo. Si cambia el criterio en index.js, hay que replicarlo aquí.
const isTechnicalId = (rawId, svgId) => {
  if (rawId === svgId) return true;
  if (/^SVGID/i.test(rawId)) return true;
  if (/clip/i.test(rawId)) return true;
  return false;
};

// Construye, para cada parte "dibujable" del SVG (o cada <g> con id propio),
// un selector CSS listo para usar en gsap. Si el elemento tiene id (no
// técnico) usa '#id'. Si NO tiene id -- caso frecuente en SVGs exportados
// sin capas nombradas, ver CvIcon.jsx -- usa su posición real entre
// hermanos del mismo tag ('#grupoPadre path:nth-of-type(3)' o, si no hay
// grupo padre con id, '#SVG_ID path:nth-of-type(3)'), que es justo cómo
// :nth-of-type resuelve en el DOM final (SVGR no cambia el anidamiento).
export const buildAnimatableContext = (optimizedSvg, svgId) => {
  const stack = []; // { id: string|null, childTagCounts: Map<tag, count> }
  const items = [];

  let match = TAG_RE.exec(optimizedSvg);
  while (match) {
    const [, closing, tag, attrs, selfClosing] = match;

    if (closing) {
      stack.pop();
      match = TAG_RE.exec(optimizedSvg);
      continue;
    }

    const parent = stack[stack.length - 1] ?? null;
    if (parent) {
      parent.childTagCounts.set(tag, (parent.childTagCounts.get(tag) || 0) + 1);
    }

    const idMatch = attrs.match(ID_RE);
    const rawId = idMatch ? idMatch[1] : null;
    const technical = rawId ? isTechnicalId(rawId, svgId) : false;
    const group = [...stack].reverse().find((frame) => frame.id)?.id ?? null;

    if (DRAWABLE_TAGS.includes(tag)) {
      if (rawId && !technical) {
        items.push({ selector: `#${rawId}`, tag, group });
      } else if (!rawId) {
        const nthOfType = parent ? parent.childTagCounts.get(tag) : 1;
        const scope = group ? `#${group}` : `#${svgId}`;
        items.push({ selector: `${scope} ${tag}:nth-of-type(${nthOfType})`, tag, group });
      }
    } else if (tag === 'g' && rawId && !technical) {
      // Un <g> con id agrupa varias partes: también es animable como bloque
      // (igual que hoy permite animatableIds en index.js).
      items.push({ selector: `#${rawId}`, tag, group });
    }

    if (!selfClosing) {
      // Solo los <g> con id cuentan como "grupo padre": el <svg> raíz nunca
      // debe usarse como tal, porque forceSvgRootAttrs (index.js) siempre le
      // borra el id original de Illustrator (ej: "Capa_1") y lo sustituye
      // por {SVG_ID} en el componente final — un selector que apuntara al id
      // original no encontraría nada.
      stack.push({ id: tag === 'g' && rawId && !technical ? rawId : null, childTagCounts: new Map() });
    }

    match = TAG_RE.exec(optimizedSvg);
  }

  return items;
};

// Ejemplos reales del proyecto (WorkIcon.jsx, Calendar.jsx) para que la IA
// copie el estilo: tl.from(...) encadenados, eases y duraciones típicas,
// transformOrigin, stagger por selector repetido.
const STYLE_EXAMPLES = `
Ejemplo 1 (WorkIcon.jsx):
tl.from('#dot1', { duration: 0.5, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0)
  .from('#star1', { duration: 0.5, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0)
  .from('#camera', { duration: 0.6, scale: 0.8, yPercent: 10, rotation: -10, ease: 'back.out(4)', transformOrigin: '50% 100%' }, 0.2)
  .from('#tool1', { duration: 1.5, scale: 0.7, yPercent: 20, ease: 'elastic.out(1, 0.5)', transformOrigin: '50% 100%' }, 0.3);

Ejemplo 2 (Calendar.jsx, agrupando varias partes con el mismo selector para stagger):
tl.from('#ring1', { duration: 0.4, scaleY: 0, transformOrigin: '50% 0%', ease: 'back.out(3)' }, 0)
  .from('.calendar-day', { duration: 0.4, scale: 0, transformOrigin: '50% 50%', ease: 'back.out(4)', stagger: 0.04 }, 0.5)
  .from('#check', { duration: 0.4, repeat: -1, yoyo: true, repeatDelay: 0.2, scale: 0, transformOrigin: '50% 50%', ease: 'back.out(4)' }, '-=0.1');
`.trim();

export const buildPrompt = ({ componentName, svgId, items }) => {
  const itemsList = items
    .map((item) => `- ${item.selector}  (tag: ${item.tag}${item.group ? `, dentro de #${item.group}` : ''})`)
    .join('\n');

  return `
Genera el CUERPO de la función animateExtras(tl) para el icono React "${componentName}" (proyecto con GSAP + ScrollTrigger).

Contexto del sistema (no lo repitas, ya existe):
- "tl" es un gsap.timeline ya vinculado a un ScrollTrigger, pausado hasta que el icono entra en el viewport.
- El trazado (drawSVG 0%→100%) de TODOS los circle/path/line/polygon/polyline del icono YA está animado en el tiempo 0 por otro hook (useScrollDraw). NO lo repitas ni lo dupliques.
- animateExtras añade animaciones de ENTRADA por ENCIMA de ese trazado: partes que aparecen (scale 0→1), se desplazan, rotan, laten, parpadean, etc. Igual que en los ejemplos.

Selectores disponibles (son los ÚNICOS que puedes usar, cópialos tal cual, no inventes otros ni los combines de otra forma):
${itemsList}

Puedes agrupar varios selectores en un array para animarlos juntos: tl.from(['#a', '#b'], { ... }, 0). Puedes usar stagger si repites el mismo selector para varios elementos.

${STYLE_EXAMPLES}

Reglas de salida (muy importante, se procesan por script, no las incumplas):
- Tu respuesta debe EMPEZAR directamente por "tl." en la primera línea. Nada antes: ni frases de introducción ("Voy a generar...", "Aquí tienes..."), ni razonamiento, ni backticks, ni bloques de código markdown (\`\`\`).
- Tampoco añadas nada después del "tl....;" final: ni frases de cierre, ni comentarios.
- NO incluyas la firma "const animateExtras = (tl) => {".
- NO uses ningún selector que no esté en la lista de arriba.
`.trim();
};

// La IA no siempre respeta "no escribas nada antes del código" (a veces mete
// una frase tipo "Voy a generar..." delante de un bloque \`\`\`js): por eso no
// basta con quitar los backticks de los extremos, hay que buscar el bloque
// de código venga donde venga, o si no hay bloque, cortar a partir de la
// primera aparición real de "tl." (que es donde empieza el código).
const extractAnimateExtrasCode = (text) => {
  const trimmed = text.trim();

  const fenced = trimmed.match(/```(?:[a-zA-Z]*)\n?([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();

  const tlStart = trimmed.search(/(^|\n)\s*tl\s*\./);
  if (tlStart === -1) return trimmed;
  return trimmed.slice(tlStart).trim();
};

// Ejecuta la CLI de Claude Code de forma síncrona (bloquea npm run icon
// mientras responde). Usa execFileSync (sin shell) para no tener que
// escapar el prompt a mano: los argumentos van directos al proceso, sin
// riesgo de que algún carácter especial del SVG dispare interpolación de
// shell.
export const generateAnimateExtras = (prompt) => {
  try {
    const stdout = execFileSync('claude', ['-p', prompt, '--output-format', 'json'], {
      encoding: 'utf8',
      timeout: 120_000,
    });

    const parsed = JSON.parse(stdout.trim());
    if (parsed.is_error || typeof parsed.result !== 'string') {
      console.warn('⚠ La IA devolvió un error o una respuesta sin "result"; se deja el TODO manual.');
      return null;
    }

    const code = extractAnimateExtrasCode(parsed.result);
    if (!code.includes('tl.')) {
      console.warn('⚠ La respuesta de la IA no parece código de animateExtras válido; se deja el TODO manual.');
      return null;
    }

    return code;
  } catch (error) {
    console.warn(`⚠ No se pudo generar animateExtras con IA (${error.message}); se deja el TODO manual.`);
    return null;
  }
};

// Punto de entrada único que llama index.js: construye el contexto, el
// prompt, invoca la IA y devuelve el código ya listo para insertar en la
// plantilla, o null si no hay nada animable o algo falla.
export const generateAiAnimateExtras = ({ componentName, svgId, optimizedSvg }) => {
  const items = buildAnimatableContext(optimizedSvg, svgId);
  if (items.length === 0) return null;

  const prompt = buildPrompt({ componentName, svgId, items });
  return generateAnimateExtras(prompt);
};
