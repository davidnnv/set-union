import { useState } from 'react';
import { useApp } from '../App.jsx';
import { RAL_SWATCHES } from '../data/content.js';

// A RAL fan deck: strips pivot on one rivet. Tap a strip to pull it out.
export default function FanDeck() {
  const { lang, t, setInquiry } = useApp();
  const [active, setActive] = useState(4);
  const n = RAL_SWATCHES.length;
  const spread = 64; // total fan angle in degrees
  const sw = RAL_SWATCHES[active];

  const ask = () => {
    setInquiry((q) => ({ ...q, shade: sw.code }));
    window.location.hash = 'contact';
  };

  return (
    <div className="fan">
      <div className="fan-stage" role="radiogroup" aria-label={t.fanHint}>
        {RAL_SWATCHES.map((s, i) => {
          const angle = -spread / 2 + (spread / (n - 1)) * i;
          const isActive = i === active;
          return (
            <button
              key={s.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`strip${isActive ? ' is-active' : ''}`}
              style={{ '--a': `${angle}deg`, '--i': i, '--sw': s.hex, zIndex: isActive ? 20 : i }}
              onClick={() => setActive(i)}
            >
              <span className="strip-color" />
              <span className="strip-label">
                <span className="strip-code">{s.code}</span>
                <span className="strip-name">{s[lang]}</span>
              </span>
            </button>
          );
        })}
        <span className="rivet" aria-hidden="true" />
      </div>

      <div className="fan-readout" aria-live="polite">
        <span className="readout-chip" style={{ background: sw.hex }} aria-hidden="true" />
        <div className="readout-text">
          <span className="readout-code">{sw.code}</span>
          <span className="readout-name">{sw[lang]}</span>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={ask}>{t.ctaQuote}</button>
      </div>
      <p className="fan-note">{t.swatchNote}</p>
    </div>
  );
}
