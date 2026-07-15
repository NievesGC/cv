import { useRef } from 'react';
import { useScrollDraw } from '../useScrollDraw';
import '../SvgIcon.scss';

const SVG_ID = 'icon-work';

// Animaciones propias del icono, además del trazado base que aplica useScrollDraw.
const animateExtras = (tl) => {
  tl.from('#dot1', { duration: 0.5, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0)
    .from('#dot2', { duration: 0.2, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0.1)
    .from('#dot3', { duration: 0.3, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0.1)
    .from('#star1', { duration: 0.5, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0)
    .from('#star2', { duration: 0.5, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0.7)
    .from('#star3', { duration: 0.2, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0.3)
    .from('#star4', { duration: 0.3, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.2, ease: 'power4.out', transformOrigin: '50% center' }, 0.1)
    .from('#star5', { duration: 0.3, scale: 0, repeat: -1, yoyo: true, repeatDelay: 0.3, ease: 'power4.out', transformOrigin: '50% center' }, 0.1)
    .from('#camera', { duration: 0.6, scale: 0.8, yPercent: 10, rotation: -10, ease: 'back.out(4)', transformOrigin: '50% 100%' }, 0.2)
    .from('#tool1', { duration: 1.5, scale: 0.7, yPercent: 20, ease: 'elastic.out(1, 0.5)', transformOrigin: '50% 100%' }, 0.3)
    .from('#tool2', { duration: 1.4, scale: 0.8, yPercent: 10, ease: 'elastic.out(1, 0.5)', transformOrigin: '50% 100%' }, 0.3);
};

const WorkIcon = () => {
  const containerRef = useRef(null);

  useScrollDraw(containerRef, SVG_ID, animateExtras);

  return (
    <div className="svg-icon" ref={containerRef}>
      <svg
        version="1.1"
        className="svg-icon__svg"
        id={SVG_ID}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 465.9 511.8"
        style={{ enableBackground: 'new 0 0 465.9 511.8' }}
        xmlSpace="preserve"
      >
        <circle style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }} cx="231.7" cy="234.4" r="193.2" />
        <g id="stars">
          <g id="star5">
            <g>
              <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="219.8" y1="72.8" x2="204.1" y2="72.8" />
            </g>
            <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="212" y1="80.6" x2="212" y2="64.9" />
          </g>
          <g id="star4">
            <g>
              <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="113.9" y1="136.8" x2="98.2" y2="136.8" />
            </g>
            <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="106.1" y1="144.7" x2="106.1" y2="129" />
          </g>
          <g id="star3">
            <g>
              <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="281" y1="91.7" x2="291.8" y2="80.2" />
            </g>
            <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="280.7" y1="80.6" x2="292.1" y2="91.3" />
          </g>
          <g id="star2">
            <g>
              <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="89.6" y1="343.5" x2="100.4" y2="332.1" />
            </g>
            <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="89.3" y1="332.4" x2="100.7" y2="343.2" />
          </g>
          <g id="star1">
            <g>
              <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="380.8" y1="313.4" x2="365.1" y2="313.4" />
            </g>
            <line style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="372.9" y1="321.3" x2="372.9" y2="305.5" />
          </g>
          <circle id="dot3" style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} cx="348.9" cy="335.6" r="2.3" />
          <circle id="dot2" style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} cx="233.2" cy="95.5" r="2.3" />
          <circle id="dot1" style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} cx="72.4" cy="295.1" r="2.3" />
        </g>
        <g id="camera">
          <path
            style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
            d="M168.5,417l79.6-118.2
                    L224,282.9c0,0-60.2,91.1-80.7,122.4C142,407.3,168.5,417,168.5,417z"
          />
          <g>
            <g>
              <defs>
                <circle id="SVGID_1_work" cx="233.2" cy="238.7" r="193.2" />
              </defs>
              <clipPath id="SVGID_2_work">
                <use xlinkHref="#SVGID_1_work" style={{ overflow: 'visible' }} />
              </clipPath>
              <path
                style={{ clipPath: 'url(#SVGID_2_work)', fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                d="
                        M350.7,386.6L290,297.8h26c5.3,0,9.7-3.8,9.7-8.5v-3c0-4.7-4.3-8.5-9.7-8.5H159.7v20h63.8l-3.1,129c8,0.6,17.6,0.8,26.4,0
                        c9.5-0.9,7.9-2.4,7.9-10.6l-0.6-119.2l68.2,107.8C322.4,404.9,342.4,393,350.7,386.6z"
              />
            </g>
            <path
              style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
              d="M424.6,149.7L403,165
                      h-29.5v-33.2c0-9.1-7.5-16.5-16.8-16.5H191.1l-19.5-17.8c-0.4-0.4-1-0.6-1.6-0.6h-52.5c-1.3,0-2.4,1.1-2.4,2.4v16v41.6v104.4
                      c0,9.1,7.5,16.5,16.8,16.5h225c9.3,0,16.8-7.4,16.8-16.5v-24.4H403l21.9,15.3c7.3,5.3,17.3-0.1,17.3-9.3v-34.1v-10.7v-39.4
                      C442.3,149.2,431.8,143.9,424.6,149.7z"
            />
            <path
              style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
              d="M348.7,264.1h-92.2
                      c-4.7,0-8.5-3.8-8.5-8.5v0c0-4.7,3.8-8.5,8.5-8.5h92.2c4.7,0,8.5,3.8,8.5,8.5v0C357.2,260.3,353.4,264.1,348.7,264.1z"
            />
          </g>
          <g>
            <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="165.6" y1="238.7" x2="200.3" y2="238.7" />
            <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="380.7" y1="209.9" x2="380.7" y2="214.6" />
            <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="380.7" y1="199.1" x2="380.7" y2="178" />
            <circle style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }} cx="311.3" cy="155.2" r="8.7" />
          </g>
        </g>
        <g id="tools">
          <defs>
            <circle id="SVGID_3_work" cx="233.2" cy="234.6" r="193.2" />
          </defs>
          <clipPath id="SVGID_4_work">
            <use xlinkHref="#SVGID_3_work" style={{ overflow: 'visible' }} />
          </clipPath>
          <g style={{ clipPath: 'url(#SVGID_4_work)' }}>
            <g id="tool2">
              <polygon
                style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                points="248,488.2
                        198.5,508.8 84.6,239.2 134.1,218.6      "
              />
              <polygon
                style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                points="83.9,169.5
                        84.6,239.4 134.4,218.6      "
              />
              <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="113.8" y1="241.1" x2="216.6" y2="482.3" />
              <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="109" y1="265.1" x2="202.7" y2="489.2" />
              <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="135.7" y1="254.6" x2="231.7" y2="482.8" />
              <line style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: '10' }} x1="84.2" y1="199.1" x2="103.5" y2="188.6" />
            </g>
          </g>
          <g style={{ clipPath: 'url(#SVGID_4_work)' }}>
            <g id="tool1">
              <polygon
                style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                points="226.9,302.4
                        179.7,308.1 177.7,189 201,186.2     "
              />
              <path
                style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                d="M217.3,160.2
                        c2.1,17.8-10.6,34-28.4,36.1c-17.8,2.1-34-10.6-36.1-28.4c-2.1-17.3,1.3-61.6,43.8-81.8c0,0-8.6,11.6-2.1,31.5
                        C201.1,137.4,214,132.3,217.3,160.2z"
              />
              <path
                style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                d="M158.9,125.9
                        c2.4,1.2,3.8,3.4,5.9,5.6c4,3.7,10,3.6,14.4,0.7c4.4-3.5,11.3-15.7,12.9-15.8"
              />
              <polygon
                style={{ fill: 'var(--svg-icon-fill)', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
                points="244.6,479.9
                        203.8,481.9 178.2,308.2 228.6,302.2     "
              />
            </g>
          </g>
        </g>
        <path
          style={{ fill: 'none', stroke: 'var(--svg-icon-stroke)', strokeWidth: '6', strokeLinejoin: 'round', strokeMiterlimit: '10' }}
          d="M262.4,425.1
                  c-19.7,2.6-42.9,2.8-62-0.1c-19.6-3-38.5-8.8-55.9-18.2c-18.6-10.1-36.8-22.4-51.4-37.8"
        />
        <rect style={{ fill: 'none' }} width="465.9" height="36.9" />
      </svg>
    </div>
  );
};

export default WorkIcon;
