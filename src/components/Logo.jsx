// SET-UNION logo: three process inks (C, M, Y) overlapping into one mark —
// a literal "union" of colour, where all three meet in black (K).
// The circles converge on first load; standalone files are in public/brand/.
export function LogoMark({ className = 'logo-mark', animate = false }) {
  return (
    <svg className={`${className}${animate ? ' is-animated' : ''}`} viewBox="0 0 40 40" aria-hidden="true">
      <g className="mark-ink">
        <circle className="ink ink-c" cx="20" cy="13.2" r="11" fill="var(--plate-cyan)" />
        <circle className="ink ink-m" cx="13.6" cy="24.4" r="11" fill="var(--plate-magenta)" />
        <circle className="ink ink-y" cx="26.4" cy="24.4" r="11" fill="var(--plate-yellow)" />
      </g>
    </svg>
  );
}

export default function Logo({ animate = false }) {
  return (
    <span className="logo">
      <LogoMark animate={animate} />
      <span className="logo-word">
        <span className="logo-set">SET</span>
        <span className="logo-union">UNION</span>
      </span>
    </span>
  );
}
