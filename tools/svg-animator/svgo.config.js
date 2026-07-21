// Configuración de SVGO para preparar SVGs exportados de Illustrator antes
// de convertirlos a JSX. Se exporta como fábrica (no como objeto estático)
// porque el prefijo de ids depende del --name recibido por la CLI: cada
// icono necesita ids únicos en toda la página (defs, clipPath...).
export default function createSvgoConfig(prefix, delim = '_') {
  return {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // Illustrator define el tamaño real del icono en el viewBox: no
            // se debe tocar. En SVGO 4, removeViewBox ya no forma parte de
            // preset-default (el viewBox se conserva por defecto), así que
            // no lo listamos aquí para evitar el warning de "plugin no
            // encontrado en el preset" en cada ejecución.
            // Conservamos los ids originales (dots, stars, tools...) para
            // poder detectarlos como partes animables en el paso siguiente.
            cleanupIds: false,
            // No fusionamos paths ni colapsamos grupos con id: cada uno es
            // una parte animable independiente y debe seguir existiendo como
            // nodo propio en el JSX resultante.
            collapseGroups: false,
            mergePaths: false,
          },
        },
      },
      {
        // prefixIds no permite prefijar solo los ids "técnicos" (SVGID_*,
        // clipPath...): prefija TODOS los ids del documento, incluyendo
        // referencias (url(#...), href, xlink:href), así que markup y
        // animateExtras usan siempre los mismos nombres ya prefijados.
        name: 'prefixIds',
        params: {
          prefix,
          delim,
        },
      },
    ],
  };
}
