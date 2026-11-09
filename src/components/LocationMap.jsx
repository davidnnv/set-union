import { useEffect, useRef, useState } from 'react';
import { useApp } from '../App.jsx';
import { COMPANY } from '../data/content.js';

// Google Maps embed looks the address up itself, so the pin is always on the real building.
// Set VITE_MAP_EMBED=off to show the illustrated placeholder instead (used for previews).
const EMBED = import.meta.env.VITE_MAP_EMBED !== 'off';

export default function LocationMap() {
  const { t, lang } = useApp();
  const [which, setWhich] = useState(0);
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);

  // Load the map only when the section scrolls near, to keep the page fast.
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const loc = COMPANY.locations[which];
  const q = encodeURIComponent(loc.query);
  const links = [
    { label: 'Google Maps', href: `https://www.google.com/maps/dir/?api=1&destination=${q}` },
    { label: 'Waze', href: `https://waze.com/ul?q=${q}&navigate=yes` },
    { label: 'Apple Maps', href: `https://maps.apple.com/?daddr=${q}` },
  ];

  const copy = async () => {
    try { await navigator.clipboard.writeText(t[loc.addrKey]); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch {}
  };

  return (
    <div className="locmap" ref={ref}>
      <div className="locmap-side">
        <div className="loc-tabs" role="tablist" aria-label={t.mapTitle}>
          {COMPANY.locations.map((l, i) => (
            <button
              key={l.key}
              type="button"
              role="tab"
              id={`loc-tab-${l.key}`}
              aria-selected={i === which}
              aria-controls="loc-panel"
              className="loc-tab"
              onClick={() => setWhich(i)}
            >
              <span className="loc-pin" data-tone={l.tone} aria-hidden="true" />
              <span className="loc-tab-text">
                <span className="loc-tab-name">{t[l.key]}</span>
                <span className="loc-tab-addr">{t[l.addrKey]}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="loc-actions">
          <p className="loc-actions-label">{t.directions}</p>
          <div className="loc-links">
            {links.map((l) => (
              <a key={l.label} className="btn btn-ghost btn-sm" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <button type="button" className="copy-btn" onClick={copy}>{copied ? t.copied : t.copyAddress}</button>
        </div>
      </div>

      <div className="locmap-frame" id="loc-panel" role="tabpanel" aria-labelledby={`loc-tab-${loc.key}`}>
        {EMBED && inView ? (
          <iframe
            key={loc.key + lang}
            title={`${t[loc.key]} — ${t[loc.addrKey]}`}
            src={`https://maps.google.com/maps?q=${q}&z=16&hl=${lang}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <MapIllustration label={t[loc.key]} addr={t[loc.addrKey]} note={t.mapNote} tone={loc.tone} key={loc.key} />
        )}
      </div>
    </div>
  );
}

// Abstract city map with the Vardar river — shown when the live map is off.
function MapIllustration({ label, addr, note, tone }) {
  return (
    <div className="map-illo" data-tone={tone}>
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="400" fill="var(--map-ground)" />
        <g stroke="var(--map-street)" strokeWidth="10" strokeLinecap="round" fill="none">
          <path d="M-20 90 L620 60" /><path d="M-20 300 L620 330" /><path d="M120 -20 L90 420" />
          <path d="M470 -20 L500 420" /><path d="M-20 200 Q300 170 620 210" />
        </g>
        <g stroke="var(--map-street)" strokeWidth="4" fill="none">
          <path d="M200 -20 L190 420" /><path d="M380 -20 L400 420" /><path d="M-20 140 L620 120" /><path d="M-20 255 L620 270" />
          <path d="M40 -20 L20 420" /><path d="M560 -20 L580 420" />
        </g>
        <path className="river" d="M-20 365 C 120 330, 220 380, 330 345 S 520 300, 640 330" stroke="var(--map-water)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path className="route" d="M60 380 L80 300 L260 290 L290 190" stroke="var(--tone)" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 9" />
        <circle className="pulse" cx="300" cy="185" r="14" fill="var(--tone)" />
        <circle className="pulse pulse-2" cx="300" cy="185" r="14" fill="var(--tone)" />
        <path d="M300 200 C 286 182, 280 172, 280 162 a20 20 0 1 1 40 0 c0 10 -6 20 -20 38 z" fill="var(--plate)" stroke="var(--plate-white)" strokeWidth="3" />
        <circle cx="300" cy="162" r="7" fill="var(--plate-white)" />
      </svg>
      <div className="map-illo-card">
        <strong>{label}</strong>
        <span>{addr}</span>
        <small>{note}</small>
      </div>
    </div>
  );
}
