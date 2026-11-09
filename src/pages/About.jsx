import { useApp } from '../App.jsx';
import { COMPANY, PRODUCTS, PHOTOS } from '../data/content.js';
import Photo from '../components/Photo.jsx';
import { href } from '../router.js';

export default function About() {
  const { t, lang } = useApp();
  return (
    <>
      <section className="p-hero">
        <div className="wrap narrow">
          <p className="eyebrow">{t.aboutEyebrow}</p>
          <h1 className="h1">{t.aboutTitle}</h1>
        </div>
        <div className="wrap">
          <Photo className="wide-photo" src={PHOTOS.factory.src} alt="" eager />
        </div>
      </section>

      <section className="section">
        <div className="wrap about-grid">
          <div className="prose">
            {t.aboutBody.map((p) => <p key={p}>{p}</p>)}
            <p className="quality">{t.quality}</p>
          </div>

          <ol className="timeline reveal" aria-label="Timeline">
            <li>
              <span className="tl-year">{COMPANY.founded}</span>
              <span>{t.facts[0].label}</span>
            </li>
            <li>
              <span className="tl-year">{COMPANY.exclusiveSince}</span>
              <span>{t.facts[1].label}</span>
            </li>
            <li>
              <span className="tl-year">{new Date().getFullYear()}</span>
              <span>
                {PRODUCTS.map((p, i) => (
                  <span key={p.slug}>
                    <a href={href(p.slug)}>{p[lang].title}</a>{i < PRODUCTS.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap two-col">
          <div>
            <h2 className="h3">{t.partnersTitle}</h2>
            <ul className="partner-list reveal">
              {COMPANY.partners.map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="partner-name">{p.name}</span>
                    <span className="muted small">{t.partnersNote} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h3">{t.otherTitle}</h2>
            <ul className="plain-list">
              {t.other.map((o) => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
