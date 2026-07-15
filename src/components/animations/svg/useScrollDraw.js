import { useEffect } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin, ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// Anima el trazo de un SVG (circle/path/line/polygon/polyline) al entrar en
// el viewport. `svgId` debe coincidir con el id del <svg>. `extendTimeline`
// permite añadir animaciones propias del icono (partes que aparecen,
// brillan, etc.) sobre la misma timeline, ya vinculada al ScrollTrigger.
export const useScrollDraw = (containerRef, svgId, extendTimeline) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: `#${svgId}`,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });

      tl.fromTo(
        [
          `#${svgId} circle`,
          `#${svgId} g path`,
          `#${svgId} g line`,
          `#${svgId} g circle`,
          `#${svgId} g polygon`,
          `#${svgId} g polyline`,
        ],
        { drawSVG: '0%' },
        { duration: 0.8, drawSVG: '100%' },
        0
      );

      extendTimeline?.(tl);
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, svgId, extendTimeline]);
};
