const CX = 210;
const CY = 330;
const OUTER_R = 190;
const MAJOR_INNER_R = 160;
const MINOR_INNER_R = 175;
const START_DEG = 215;
const END_DEG = -35;
const STEP_DEG = 5;

function pointOnCircle(deg: number, r: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [
    Math.round((CX + r * Math.cos(rad)) * 100) / 100,
    Math.round((CY - r * Math.sin(rad)) * 100) / 100,
  ];
}

function buildTicks() {
  const ticks: { x1: number; y1: number; x2: number; y2: number; major: boolean }[] = [];
  let i = 0;
  for (let d = START_DEG; d >= END_DEG - 0.001; d -= STEP_DEG, i++) {
    const major = i % 6 === 0;
    const [x1, y1] = pointOnCircle(d, major ? MAJOR_INNER_R : MINOR_INNER_R);
    const [x2, y2] = pointOnCircle(d, OUTER_R);
    ticks.push({ x1, y1, x2, y2, major });
  }
  return ticks;
}

/** Abstract speedometer-style arc — the hero's signature illustration.
 * Deliberately not a photo: the gallery's inventory photos are placeholders
 * for now, so the first thing a visitor sees is independent of them. */
export default function GaugeArt({ className }: { className?: string }) {
  const ticks = buildTicks();
  const [needleX, needleY] = pointOnCircle(58, 132);

  return (
    <svg
      viewBox="0 0 420 460"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <circle
        cx={CX}
        cy={CY}
        r={OUTER_R + 14}
        className="fill-none stroke-mist/15"
        strokeWidth={1}
      />
      {ticks.map((tick, index) => (
        <line
          key={index}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          strokeWidth={tick.major ? 2.5 : 1}
          strokeLinecap="round"
          className={tick.major ? "stroke-rust" : "stroke-mist/40"}
        />
      ))}
      <line
        x1={CX}
        y1={CY}
        x2={needleX}
        y2={needleY}
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-paper"
      />
      <circle cx={CX} cy={CY} r={10} className="fill-ink stroke-rust" strokeWidth={3} />
    </svg>
  );
}
