#!/usr/bin/env node
// CLI de build-time: genera un componente de icono SVG animado con GSAP a
// partir de un SVG exportado de Illustrator, con la misma estructura que
// src/components/animations/svg/icons/WorkIcon.jsx.
//
// Este script NO es código de la web: vive en tools/ y solo se ejecuta en
// desarrollo (npm run icon), nunca se incluye en el bundle de producción.
//
// Uso:
//   npm run icon -- --input tools/svg-animator/raw/work.svg --name Work
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { optimize } from 'svgo';
import { transform } from '@svgr/core';

import createSvgoConfig from './svgo.config.js';
import { buildComponentSource } from './template.js';
import { generateAiAnimateExtras } from './ai-animator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const ICONS_DIR = path.join(PROJECT_ROOT, 'src/components/animations/svg/icons');
const SVG_INDEX_BARREL = path.join(PROJECT_ROOT, 'src/components/animations/svg/index.js');
const ICONS_INDEX_BARREL = path.join(ICONS_DIR, 'index.js');

const USAGE = `
Uso:
  npm run icon -- --input <ruta-al-svg> --name <NombrePascalCase> [--force]

Ejemplo:
  npm run icon -- --input tools/svg-animator/raw/work.svg --name Work

Opciones:
  --input   Ruta al SVG exportado de Illustrator (obligatorio). Admite rutas
            absolutas o relativas, dentro o fuera de tools/svg-animator/raw/.
  --name    Nombre en PascalCase del icono, ej: Work → WorkIcon (obligatorio).
  --force   Sobrescribe el componente de salida si ya existe.
`;

// Parseo minimalista de argumentos: no merece la pena una dependencia extra
// (yargs, commander...) para una CLI de tres flags.
const parseArgs = (argv) => {
  const args = { force: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--input') {
      args.input = argv[i + 1];
      i += 1;
    } else if (arg === '--name') {
      args.name = argv[i + 1];
      i += 1;
    } else if (arg === '--force') {
      args.force = true;
    }
  }
  return args;
};

const fail = (message) => {
  console.error(`\nError: ${message}\n${USAGE}`);
  process.exit(1);
};

// Ids "técnicos" (no son partes animables): SVGID_* de Illustrator, cualquier
// cosa relacionada con clipPath, y el propio id del <svg> raíz. Se comprueba
// sobre el id SIN el prefijo, porque prefixIds prefija también estos ids
// técnicos (no permite prefijar de forma selectiva).
const isTechnicalId = (rawId, { prefix, delim, svgId }) => {
  const withoutPrefix = rawId.startsWith(`${prefix}${delim}`) ? rawId.slice(`${prefix}${delim}`.length) : rawId;

  if (rawId === svgId) return true;
  if (/^SVGID/i.test(withoutPrefix)) return true;
  if (/clip/i.test(withoutPrefix)) return true;
  return false;
};

// El <svg> raíz de Illustrator suele traer su propio id (ej: "Capa_1"), que
// tras prefixIds ya no coincide con svgId ("icon-nombre"). Lo detectamos
// aparte para excluirlo siempre: lo sustituimos por SVG_ID en forceSvgRootAttrs.
const extractRootSvgId = (svgText) => {
  const match = svgText.match(/<svg\b[^>]*\bid="([^"]+)"/);
  return match ? match[1] : null;
};

// Muchos exportadores (no solo Illustrator) generan el <svg> solo con
// width/height en píxeles y sin viewBox. Sin viewBox, el icono NO escala con
// el tamaño CSS del proyecto (var(--svg-icon-size)): sale con el tamaño
// intrínseco del archivo, recortado o desproporcionado según el viewport
// visible. Si detectamos ese caso, sintetizamos el viewBox a partir de las
// dimensiones originales antes de pasar el SVG por SVGO.
const ensureViewBox = (rawSvg) => {
  const rootTagMatch = rawSvg.match(/<svg\b[^>]*>/);
  if (!rootTagMatch) return rawSvg;

  const rootTag = rootTagMatch[0];
  if (/\bviewBox=/.test(rootTag)) return rawSvg;

  const widthMatch = rootTag.match(/\bwidth="([\d.]+)(?:px)?"/);
  const heightMatch = rootTag.match(/\bheight="([\d.]+)(?:px)?"/);
  if (!widthMatch || !heightMatch) return rawSvg;

  const newRootTag = rootTag.replace('<svg', `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`);
  return rawSvg.replace(rootTag, newRootTag);
};

// Extrae todos los ids del SVG optimizado, en orden de aparición y sin duplicados.
const extractIds = (svgText) => {
  const ids = [];
  const seen = new Set();
  const regex = /\bid="([^"]+)"/g;
  let match = regex.exec(svgText);
  while (match) {
    const id = match[1];
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
    match = regex.exec(svgText);
  }
  return ids;
};

// SVGR genera un componente completo (imports, función, export...); nosotros
// solo queremos el markup <svg>...</svg> para insertarlo en nuestra propia
// plantilla, así que lo extraemos y descartamos el resto del boilerplate.
const extractSvgJsx = (svgrCode) => {
  const match = svgrCode.match(/<svg[\s\S]*<\/svg>/);
  if (!match) {
    throw new Error('No se pudo extraer el JSX del <svg> generado por SVGR.');
  }
  return match[0];
};

const TAB = '  ';

// SVGR genera el JSX prácticamente en una sola línea (sin plugin de
// prettier). Lo partimos en un tag por línea e indentamos por profundidad
// para que se lea como el resto de iconos de la carpeta. No es un parser JSX
// completo: asume que los únicos "<"/">" del documento son de etiquetas, lo
// cual es cierto para el SVG que sale de SVGR (los valores de atributos y de
// los objetos style no contienen esos caracteres).
const formatSvgJsx = (svgJsx, baseIndent) => {
  const chunks = svgJsx.split(/(?<=>)(?=<)/);
  let depth = 0;

  return chunks
    .map((chunk) => {
      const trimmed = chunk.trim();
      const isClosing = trimmed.startsWith('</');
      const isSelfClosing = /\/>\s*$/.test(trimmed);

      if (isClosing) depth = Math.max(0, depth - 1);
      const line = `${baseIndent}${TAB.repeat(depth)}${trimmed}`;
      if (!isClosing && !isSelfClosing) depth += 1;

      return line;
    })
    .join('\n');
};

// Fuerza className="svg-icon__svg" e id={SVG_ID} en la etiqueta raíz <svg>, y
// quita cualquier width/height fijo que traiga el original: el tamaño del
// icono lo controla siempre el CSS (var(--svg-icon-size)) sobre el viewBox,
// igual que en WorkIcon.jsx (que no tiene width/height, solo viewBox).
const forceSvgRootAttrs = (svgJsx) =>
  svgJsx.replace(/^<svg([^>]*)>/, (_full, attrs) => {
    const cleanedAttrs = attrs
      .replace(/\s*className="[^"]*"/, '')
      .replace(/\s*id="[^"]*"/, '')
      .replace(/\s*id=\{[^}]*\}/, '')
      .replace(/\s*width="[^"]*"/, '')
      .replace(/\s*width=\{[^}]*\}/, '')
      .replace(/\s*height="[^"]*"/, '')
      .replace(/\s*height=\{[^}]*\}/, '');
    return `<svg className="svg-icon__svg" id={SVG_ID}${cleanedAttrs}>`;
  });

// Clasifica un color como 'dark' o 'light' según su luminosidad percibida,
// para saber si corresponde a var(--svg-icon-stroke) (negro) o
// var(--svg-icon-fill) (blanco). Devuelve null si el color tiene un matiz
// real (no es un gris/blanco/negro) o no se puede interpretar (url(...),
// rgb(...), nombres no reconocidos...): esos NO se tocan, porque el sistema
// de iconos de este proyecto (SvgIcon.scss) es a dos tonos y forzarlos a
// blanco o negro perdería el color real del icono (o lo dejaría invisible).
const classifyColor = (value) => {
  const v = value.trim().toLowerCase();
  if (v === 'black') return 'dark';
  if (v === 'white') return 'light';

  const hexMatch = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (!hexMatch) return null;

  const hex = hexMatch[1];
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  if (Math.max(r, g, b) - Math.min(r, g, b) > 12) return null; // matiz real, no gris

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 127.5 ? 'light' : 'dark';
};

const CSS_VAR_BY_TONE = { dark: 'var(--svg-icon-stroke)', light: 'var(--svg-icon-fill)' };

// Sustituye colores fill/stroke por las variables CSS del proyecto, tanto en
// atributos sueltos (fill="#333") como en objetos style={{ ... }} generados
// por SVGR (SVGR usa comillas dobles, distinto del resto del proyecto, así
// que aceptamos ambas). "none" se respeta siempre. El color original decide
// qué variable le corresponde (ver classifyColor), no la propiedad en la que
// aparece: así un fill oscuro también se convierte en negro, no en blanco.
const replaceColorProp = (svgJsx, propName, unresolvedColors) => {
  const attrRegex = new RegExp(`\\b${propName}=(["'])(.*?)\\1`, 'g');
  const styleRegex = new RegExp(`\\b${propName}: (["'])(.*?)\\1`, 'g');

  const replacer = (match, quote, value) => {
    if (value.trim().toLowerCase() === 'none') return match;

    const tone = classifyColor(value);
    if (!tone) {
      unresolvedColors.add(value);
      return match;
    }

    return `${match.slice(0, match.indexOf(quote) + 1)}${CSS_VAR_BY_TONE[tone]}${quote}`;
  };

  return svgJsx.replace(attrRegex, replacer).replace(styleRegex, replacer);
};

// Devuelve el JSX con los colores sustituidos y el conjunto de colores que no
// se pudieron clasificar como blanco/negro (para avisar al usuario).
const applyColorVariables = (svgJsx) => {
  const unresolvedColors = new Set();
  let result = replaceColorProp(svgJsx, 'fill', unresolvedColors);
  result = replaceColorProp(result, 'stroke', unresolvedColors);
  return { svgJsx: result, unresolvedColors };
};

// Añade el export del nuevo icono al barrel existente (icons/index.js y/o
// svg/index.js), manteniendo el estilo de línea ya usado en cada archivo.
// Si un barrel no existe o no tiene exports manuales de iconos, no se toca.
const updateBarrels = (componentName) => {
  [
    { file: ICONS_INDEX_BARREL, importPath: `./${componentName}` },
    { file: SVG_INDEX_BARREL, importPath: `./icons/${componentName}` },
  ].forEach(({ file, importPath }) => {
    if (!existsSync(file)) return;

    const content = readFileSync(file, 'utf-8');
    const hasManualIconExports = /^export \{ default as \w+ \} from '\.\/[^']+';$/m.test(content);
    if (!hasManualIconExports) return;

    const newLine = `export { default as ${componentName} } from '${importPath}';`;
    if (content.includes(newLine)) return; // ya registrado (p. ej. al regenerar con --force)

    const withTrailingNewline = content.endsWith('\n') ? content : `${content}\n`;
    writeFileSync(file, `${withTrailingNewline}${newLine}\n`, 'utf-8');
  });
};

const run = async () => {
  const args = parseArgs(process.argv.slice(2));

  if (!args.input || !args.name) {
    fail('faltan --input y/o --name.');
  }

  if (!/^[A-Z][A-Za-z0-9]*$/.test(args.name)) {
    fail(`--name debe estar en PascalCase (ej: Work, Camera). Recibido: "${args.name}"`);
  }

  const inputPath = path.resolve(process.cwd(), args.input);
  if (!existsSync(inputPath)) {
    fail(`no se encuentra el SVG de entrada: ${inputPath}`);
  }

  const componentName = `${args.name}Icon`;
  const prefix = args.name.toLowerCase();
  const delim = '_';
  const svgId = `icon-${prefix}`;
  const outputPath = path.join(ICONS_DIR, `${componentName}.jsx`);

  if (existsSync(outputPath) && !args.force) {
    fail(`ya existe ${path.relative(PROJECT_ROOT, outputPath)}. Usa --force para sobrescribirlo.`);
  }

  const rawSvg = ensureViewBox(readFileSync(inputPath, 'utf-8'));

  // 1. SVGO: limpia el SVG de Illustrator y prefija todos los ids para que
  //    no choquen con los de otros iconos ya existentes.
  const svgoConfig = createSvgoConfig(prefix, delim);
  const { data: optimizedSvg } = optimize(rawSvg, { path: inputPath, ...svgoConfig });

  // 2. Detectamos las partes animables sobre el SVG YA optimizado (con los
  //    ids ya prefijados), así markup y animateExtras usan los mismos nombres.
  const rootSvgId = extractRootSvgId(optimizedSvg);
  const allIds = extractIds(optimizedSvg);
  const animatableIds = allIds.filter(
    (id) => id !== rootSvgId && !isTechnicalId(id, { prefix, delim, svgId })
  );

  // 2b. Generamos las animaciones de entrada (animateExtras) con IA a partir
  //     del propio SVG optimizado: no depende de animatableIds, porque
  //     también cubre partes sin id propio (ver tools/svg-animator/ai-animator.js).
  //     Si falla o no hay nada animable, devuelve null y se usa el placeholder TODO.
  console.log('\n… generando animaciones de entrada con IA (puede tardar unos segundos)…');
  const aiAnimateExtras = generateAiAnimateExtras({ componentName, svgId, optimizedSvg });

  // 3. SVGR solo para la conversión a JSX (class→className, style string→
  //    objeto, xlink:href→xlinkHref...). Desactivamos su paso interno de
  //    SVGO porque ya hemos optimizado nosotros arriba con nuestra config.
  const svgrCode = await transform(
    optimizedSvg,
    {
      icon: false,
      svgo: false,
      expandProps: false, // no queremos {...props} en la raíz: no es un componente reutilizable genérico
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
    },
    { componentName: `${componentName}Svgr` }
  );

  let svgJsx = extractSvgJsx(svgrCode);
  svgJsx = forceSvgRootAttrs(svgJsx);
  const { svgJsx: coloredSvgJsx, unresolvedColors } = applyColorVariables(svgJsx);
  svgJsx = formatSvgJsx(coloredSvgJsx, '      '); // 6 espacios: mismo nivel que el <svg> en WorkIcon.jsx

  const source = buildComponentSource({ componentName, svgId, svgJsx, animatableIds, aiAnimateExtras });

  mkdirSync(ICONS_DIR, { recursive: true });
  writeFileSync(outputPath, source, 'utf-8');

  updateBarrels(componentName);

  console.log(`\n✔ Icono generado: ${path.relative(PROJECT_ROOT, outputPath)}`);
  console.log(
    `  ids animables detectados (${animatableIds.length}): ${animatableIds.join(', ') || '(ninguno)'}`
  );
  console.log(`  animateExtras: ${aiAnimateExtras ? 'generado con IA (revísalo antes de dar por bueno el icono)' : 'placeholder manual (TODO)'}\n`);

  if (unresolvedColors.size > 0) {
    console.warn(
      `⚠ ${unresolvedColors.size} color(es) del SVG original no son blanco/negro y se han dejado tal cual ` +
        `(el sistema de iconos de este proyecto es a dos tonos): ${[...unresolvedColors].join(', ')}`
    );
    console.warn(
      `  Revisa ${path.relative(PROJECT_ROOT, outputPath)}: recolorea el SVG de origen a blanco/negro o decide si dejarlos como color literal.\n`
    );
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
