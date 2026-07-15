import './Scroll.scss';

const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'C',
  'React',
  'Next.js',
  'Claude',
  'Wordpress',
  'SVG',
  'GitHub',
  'Canva',
  'Figma',
  'Tailwind',
  'Bootstrap',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Firebase',
  'Django',
  'Flask',
  'Ruby on Rails',
  'PHP',
  'Laravel',
  'Vue.js',
  'Svelte',
  'Angular',
];

const DURATION = 85000;
const ROWS = 7;
const TAGS_PER_ROW = 20;

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const InfiniteLoopSlider = ({ children, duration, reverse = false }) => (
  <div
    className="loop-slider"
    style={{
      '--duration': `${duration}ms`,
      '--direction': reverse ? 'reverse' : 'normal',
    }}
  >
    <div className="inner">
      {children}
      {children}
    </div>
  </div>
);

const Tag = ({ text }) => (
  <div className="tag">
    <span>#</span> {text}
  </div>
);

const Scroll = () => {
  return (
    <div className="scroll-bg" aria-hidden="true">
      <div className="tag-list">
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}
          >
            {shuffle(TAGS)
              .slice(0, TAGS_PER_ROW)
              .map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
          </InfiniteLoopSlider>
        ))}
      </div>
      <div className="fade" />
    </div>
  );
};

export default Scroll;