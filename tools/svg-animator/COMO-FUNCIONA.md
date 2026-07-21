# 🏭 La fábrica de iconos animados — explicada como a un niño

Imagina que tienes un dibujo (un SVG que sacaste de Illustrator) y quieres
convertirlo en un **juguete de cuerda**: cuando haces scroll y el icono
aparece en pantalla, sus piezas se mueven solas, saltan, giran, laten...

`npm run icon` es una **cinta de fábrica** con 6 estaciones. El dibujo entra
por un lado en crudo y sale por el otro convertido en un componente React
que ya sabe animarse. Vamos estación por estación.

```
   🖼️              🧽              🕵️              🤖              🌐              📦
 dibujo   →   limpieza   →   detective   →   robot-pintor   →   traductor   →   molde final
 (raw/*.svg)   (SVGO)        (ids)          (Claude IA)        (SVGR)         (template.js)
```

---

## Estación 0 — El dibujo en crudo

📂 `tools/svg-animator/raw/*.svg`

Aquí guardas el SVG tal cual sale de Illustrator. Es solo un cajón, la
fábrica no lo toca hasta que le dices "arranca":

```
npm run icon -- --input tools/svg-animator/raw/cv.svg --name Cv
```

Esto ejecuta el jefe de la fábrica: [`tools/svg-animator/index.js`](tools/svg-animator/index.js),
función `run()` (línea 265).

---

## Estación 1 — 🧽 El lavado (SVGO)

📂 `tools/svg-animator/svgo.config.js`

Illustrator deja el SVG "sucio": con ids que pueden repetirse entre iconos
distintos (imagina que dos dibujos tienen ambos una pieza llamada
`SVGID_1_`... ¡chocarían!). Esta estación:

- **Prefija todos los ids** (`prefixIds`, línea 34): si el icono se llama
  `Cv`, `dot1` pasa a llamarse `cv_dot1`. Así nunca se pisan entre iconos.
- **NO fusiona piezas** (`collapseGroups: false`, `mergePaths: false`,
  líneas 24-25): cada trocito del dibujo debe seguir existiendo como pieza
  suelta, si no, luego no habría nada que animar por separado.
- **Conserva el `viewBox`**: es lo que hace que el icono escale bien en
  cualquier tamaño. Si el SVG original no lo trae, `ensureViewBox()` en
  [`index.js:93`](tools/svg-animator/index.js#L93) se lo inventa a partir del
  ancho/alto.

Piensa en esto como pasar el dibujo por la lavadora y ponerle una
**etiqueta con nombre** a cada pieza, sin romper ninguna.

---

## Estación 2 — 🕵️ El detective de piezas animables

📂 `tools/svg-animator/index.js`, funciones `extractIds` (línea 109) e
`isTechnicalId` (línea 70)

El detective recorre el dibujo ya limpio y hace una lista de **qué piezas
se pueden mover**. Descarta las que son "de fontanería interna" del SVG y
no partes visibles reales:

- ids que empiezan por `SVGID` (sobras técnicas de Illustrator)
- todo lo relacionado con `clip` (máscaras de recorte)
- el id del propio `<svg>` raíz

Lo que sobrevive a ese filtro es la lista `animatableIds`: los verdaderos
"personajes" del dibujo (una estrella, un punto, una cámara...).

---

## Estación 3 — 🤖 El robot-pintor (aquí interviene la IA)

📂 [`tools/svg-animator/ai-animator.js`](tools/svg-animator/ai-animator.js)

Esta es la estación mágica, y la que tenías abierta. Su trabajo: escribir
**el código de animación** por ti, llamando a Claude Code por línea de
comandos.

```
buildAnimatableContext()  →  buildPrompt()  →  generateAnimateExtras()  →  extractAnimateExtrasCode()
   (línea 40)                  (línea 109)        (línea 158)                (línea 142)
```

1. **`buildAnimatableContext`** (línea 40) recorre el SVG como un lector de
   etiquetas (no es un parser XML de verdad, es "hacer trampa" a propósito,
   ver comentario línea 15) y para cada pieza dibujable (`circle`, `path`,
   `line`, `polygon`, `polyline`) construye un **selector CSS** listo para
   usar en la animación:
   - si la pieza tiene id propio → usa `#miId`
   - si NO tiene id (muy común en SVGs sin capas nombradas, como
     [`CvIcon.jsx`](src/components/animations/svg/icons/CvIcon.jsx)) → usa su
     posición entre hermanos, tipo `#icon-cv path:nth-of-type(3)` (línea 68).

2. **`buildPrompt`** (línea 109) redacta una carta a la IA: "aquí tienes
   estos selectores, escribe el cuerpo de `animateExtras(tl)` usando SOLO
   esos, y copia el estilo de estos ejemplos reales" (los ejemplos son de
   [`WorkIcon.jsx`](src/components/animations/svg/icons/WorkIcon.jsx) y
   `Calendar.jsx`, líneas 96-107).

3. **`generateAnimateExtras`** (línea 158) llama de verdad al comando
   `claude -p "<prompt>" --output-format json` con `execFileSync` (sin
   shell, para no arriesgarse a que un carácter raro del SVG rompa nada,
   ver comentario línea 153-157).

4. **`extractAnimateExtrasCode`** (línea 142) limpia la respuesta: a veces
   la IA mete una frase antes del código o lo envuelve en \`\`\`, así que
   busca dónde empieza de verdad el `tl.`.

Si algo falla en el camino (la IA no está disponible, tarda demasiado,
responde cualquier cosa rara...) esta función devuelve `null` y **la
fábrica no se para**: usa un "TODO" de repuesto en su lugar (lo ves en
[`template.js:20-36`](tools/svg-animator/template.js#L20)).

> 🧠 Piensa en el robot-pintor como un ilustrador al que le enseñas fotos de
> trabajos anteriores (los ejemplos) y le dices "haz algo parecido a esto,
> pero solo con estas piezas concretas".

---

## Estación 4 — 🌐 El traductor a React (SVGR)

📂 [`tools/svg-animator/index.js`](tools/svg-animator/index.js), líneas 316-330

El SVG limpio todavía habla el idioma "HTML de toda la vida" (`class=`,
`style="fill:#000"` como texto). React necesita otro dialecto
(`className=`, `style={{ fill: '#000' }}` como objeto). Eso lo hace la
librería SVGR (`transform(...)`, línea 316).

Después de traducir, tres retoques manuales importantes:

- **`forceSvgRootAttrs`** (línea 167): fuerza que la etiqueta `<svg>` raíz
  tenga siempre `className="svg-icon__svg"` y `id={SVG_ID}`, y le quita
  cualquier `width`/`height` fijo — el tamaño lo manda siempre el CSS
  (`var(--svg-icon-size)`), nunca el propio archivo.
- **`applyColorVariables`** (línea 236): mira cada color (`fill`/`stroke`)
  del dibujo y decide si es "oscuro" o "claro" (`classifyColor`, línea 187,
  mide la luminosidad). Los oscuros pasan a
  `var(--svg-icon-stroke)` y los claros a `var(--svg-icon-fill)`, así el
  icono cambia de color solo con CSS (por ejemplo en modo oscuro) sin tocar
  el SVG. Los colores con matiz real (no gris/blanco/negro) se dejan tal
  cual, con un aviso al final (línea 345-353).
- **`formatSvgJsx`** (línea 144): SVGR devuelve todo en una sola línea
  gigante; esta función lo trocea en un tag por línea, con sangría, para
  que se lea como el resto de iconos de la carpeta.

---

## Estación 5 — 📦 El molde final

📂 [`tools/svg-animator/template.js`](tools/svg-animator/template.js)

Aquí se junta todo dentro de la plantilla del componente
(`buildComponentSource`, línea 38): el `SVG_ID`, la función
`animateExtras` (con el código de la IA o el TODO de repuesto,
`buildAnimateExtrasBody`, línea 20), y el JSX del dibujo ya traducido.

El resultado se escribe como archivo nuevo:

📄 `src/components/animations/svg/icons/<Nombre>Icon.jsx`

y se registra automáticamente en los índices (`updateBarrels`,
[`index.js:246`](tools/svg-animator/index.js#L246)):
- `src/components/animations/svg/icons/index.js`
- `src/components/animations/svg/index.js`

---

## Parte 2 — Qué pasa cuando el icono ya vive en la web 🌍

El archivo generado (ej. [`CvIcon.jsx`](src/components/animations/svg/icons/CvIcon.jsx))
no anima nada por sí solo: llama a un hook compartido,
[`useScrollDraw`](src/components/animations/svg/useScrollDraw.js), que es
quien mueve los hilos de verdad con la librería **GSAP**.

```
   el icono entra en pantalla (ScrollTrigger)
              │
              ▼
   1) se "dibuja" el trazo, como si alguien lo pintara con un lápiz
      (drawSVG 0% → 100%) ..................... useScrollDraw.js:24-36
              │
              ▼
   2) por ENCIMA de ese trazo, las piezas propias del icono
      aparecen, saltan, giran o laten
      (animateExtras) ............................ generado por Estación 3
```

- **`useScrollDraw`** (líneas 11-43) crea una `gsap.timeline` pausada, y
  un `ScrollTrigger` (línea 16-21) que la arranca **una sola vez**
  (`once: true`) cuando el icono llega al 80% del viewport.
- Primero anima el trazo de todas las líneas (`drawSVG`, línea 24-36): es
  el efecto de "dibujo a mano" que ves en todos los iconos.
- Luego llama a `extendTimeline?.(tl)` (línea 38) — que es justo
  `animateExtras`, el código que escribió el robot-pintor de la Estación 3.
  Por eso el comentario dice siempre *"animaciones propias del icono,
  además del trazado base"*.

---

## 🗺️ Mapa rápido (para no perderte)

| Quiero ver...                                   | Archivo                                                                                     |
|--------------------------------------------------|-----------------------------------------------------------------------------------------------|
| El SVG original sin tocar                        | `tools/svg-animator/raw/*.svg`                                                                |
| Cómo se limpian/prefijan los ids                  | `tools/svg-animator/svgo.config.js`                                                           |
| El "jefe de fábrica" que orquesta todo             | `tools/svg-animator/index.js` → `run()`                                                       |
| Cómo se decide qué piezas se pueden animar         | `tools/svg-animator/ai-animator.js` → `buildAnimatableContext()`                               |
| El prompt que se le manda a la IA                  | `tools/svg-animator/ai-animator.js` → `buildPrompt()`                                          |
| La llamada real a `claude -p ...`                  | `tools/svg-animator/ai-animator.js` → `generateAnimateExtras()`                                |
| Cómo se pintan los colores con variables CSS       | `tools/svg-animator/index.js` → `applyColorVariables()` / `classifyColor()`                    |
| La plantilla final del componente                  | `tools/svg-animator/template.js` → `buildComponentSource()`                                    |
| Un icono ya terminado, de ejemplo                  | `src/components/animations/svg/icons/CvIcon.jsx` / `WorkIcon.jsx`                              |
| Cómo se anima de verdad en el navegador (GSAP)     | `src/components/animations/svg/useScrollDraw.js`                                               |

---

## ▶️ Cómo usarlo

```bash
npm run icon -- --input tools/svg-animator/raw/cv.svg --name Cv
```

- `--input`: el SVG de origen (dentro o fuera de `raw/`).
- `--name`: nombre en PascalCase (`Cv` → genera `CvIcon.jsx`).
- `--force`: opcional, sobrescribe si el icono ya existe.

Al terminar, la terminal te dice cuántos ids animables encontró y si la
IA consiguió generar las animaciones o si tuvo que dejar el TODO manual
— en ese caso, toca abrir el archivo y rellenar cada `.from(...)` a mano,
copiando el estilo de `WorkIcon.jsx`.
