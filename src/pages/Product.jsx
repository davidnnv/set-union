import { useApp } from '../App.jsx';
import { PRODUCTS } from '../data/content.js';
import { href } from '../router.js';
import Photo from '../components/Photo.jsx';

export default function Product({ product }) {
  const { t, lang, setInquiry } = useApp();
  const c = product[lang];

  const ask = (e) => {
    e.preventDefault();
    setInquiry((q) => ({ ...q, product: product.slug }));
    window.location.hash = 'contact';
  };

  return (
    <div data-tone={product.tone}>
      <section className="p-hero">
        <div className="wrap p-hero-grid">
          <div className="p-hero-copy">
            <a className="crumb" href={href('')}>{t.nav.home}</a>
            <h1 className="h1">{c.title}</h1>
            <ul className="variant-chips" aria-label={t.variants}>
              {c.variants.map((v) => <li key={v}>{v}</li>)}
            </ul>
            <p className="lead">{c.intro}</p>
            <a className="btn btn-ink" href={href('contact')} onClick={ask}>{t.ctaQuote}</a>
          </div>
          <figure className="p-plate">
            {product.image && <Photo className="plate-photo" src={product.image.src} alt={c.title} eager />}
            <span className="p-plate-code" aria-hidden="true">{product.code}</span>
            <span className="p-plate-ramp" aria-hidden="true">
              {[100, 80, 60, 40, 20].map((v) => <span key={v}><i style={{ opacity: v / 100 }} /><em>{v}%</em></span>)}
            </span>
            {product.image?.credit && <figcaption className="plate-credit">{t.photo}: {product.image.credit} / Unsplash</figcaption>}
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap p-body">
          <div className="prose">
            {c.body.map((para) => <p key={para}>{para}</p>)}
            <p className="quality">{t.quality}</p>
          </div>

          <aside className="spec-sheet reveal" aria-label={t.specs}>
            <h2 className="spec-title">{t.specs}</h2>
            <dl>
              {c.specs.map((s) => (
                <div key={s.label} className="spec-row">
                  <dt>{s.label}</dt>
                  <dd>
                    <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>

      {c.process && (
        <section className="section section-alt">
          <div className="wrap">
            <h2 className="h3">{t.process}</h2>
            <ol className="process reveal">
              {c.process.map((step, i) => (
                <li key={step}><span className="process-n">{i + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {c.types && (
        <section className="section section-alt">
          <div className="wrap">
            <h2 className="h3">{t.types}</h2>
            <div className="types-grid">
              {c.types.map((ty) => (
                <div key={ty.name} className="type-card reveal">
                  <h3 className="type-name">{ty.name}</h3>
                  <p>{ty.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.applications && (
        <section className="section section-alt">
          <div className="wrap">
            <h2 className="h3">{t.applications}</h2>
            <ul className="app-list reveal">
              {c.applications.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <h2 className="h3">{t.otherLines}</h2>
          <div className="other-lines reveal">
            {PRODUCTS.filter((p) => p.slug !== product.slug).map((p) => (
              <a key={p.slug} href={href(p.slug)} className="other-line" data-tone={p.tone}>
                <span className="dot" aria-hidden="true" />
                <span>{p[lang].title}</span>
                <span aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
