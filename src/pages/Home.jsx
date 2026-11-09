import { useApp } from '../App.jsx';
import { PRODUCTS, PHOTOS } from '../data/content.js';
import Photo from '../components/Photo.jsx';
import { href } from '../router.js';
import FanDeck from '../components/FanDeck.jsx';
import LocationMap from '../components/LocationMap.jsx';

export default function Home() {
  const { t, lang } = useApp();
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t.tagline}</p>
            <h1 className="hero-title">
              <span className="line-mask"><span className="rise" style={{ '--d': '80ms' }}>{t.heroTitle[0]}</span></span>
              <span className="line-mask"><span className="rise hero-title-2" style={{ '--d': '200ms' }}>{t.heroTitle[1]}</span></span>
            </h1>
            <p className="lead fade-in" style={{ '--d': '340ms' }}>{t.heroLead}</p>
            <div className="btn-row fade-in" style={{ '--d': '440ms' }}>
              <a className="btn btn-ink" href="#lines" onClick={(e) => { e.preventDefault(); document.getElementById('lines')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.ctaProducts}</a>
              <a className="btn btn-ghost" href={href('contact')}>{t.ctaQuote}</a>
            </div>
          </div>
          <FanDeck />
        </div>
      </section>

      <section className="facts" aria-label="SET-UNION">
        <div className="wrap facts-row">
          {t.facts.map((f) => (
            <div key={f.value} className="fact reveal">
              <span className="fact-value">{f.value}</span>
              <span className="fact-label">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="lines" className="section">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">{t.linesEyebrow}</p>
            <h2 className="h2">{t.linesTitle}</h2>
          </header>
          <div className="lines-grid">
            {PRODUCTS.map((p) => {
              const c = p[lang];
              return (
                <a key={p.slug} href={href(p.slug)} className="line-card reveal" data-tone={p.tone}>
                  <span className="line-plate" aria-hidden="true">
                    {p.image && <Photo className="plate-photo" src={p.image.src} />}
                    <span className="line-code">{p.code}</span>
                  </span>
                  <span className="line-body">
                    <span className="line-title">{c.title}</span>
                    <span className="line-variants">{c.variants.join(' · ')}</span>
                    <span className="line-teaser">{c.teaser}</span>
                    <span className="line-more">{t.more} <span aria-hidden="true">→</span></span>
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap about-teaser">
          <div className="about-teaser-head reveal">
            <p className="eyebrow">{t.aboutEyebrow}</p>
            <h2 className="h2">{t.aboutTitle}</h2>
            <Photo className="about-photo" src={PHOTOS.fanDeck.src} alt="RAL / PANTONE" />
          </div>
          <div className="prose reveal">
            <p>{t.aboutBody[0]}</p>
            <p>{t.aboutBody[1]}</p>
            <a className="text-link" href={href('about')}>{t.nav.about} →</a>
          </div>
        </div>
      </section>

      <section className="section" id="map">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">{t.mapEyebrow}</p>
            <h2 className="h2">{t.mapTitle}</h2>
            <p className="lead">{t.mapLead}</p>
          </header>
          <div className="reveal"><LocationMap /></div>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-row">
          <h2 className="h2">{t.contactTitle}</h2>
          <a className="btn btn-paper" href={href('contact')}>{t.ctaQuote}</a>
        </div>
      </section>
    </>
  );
}
