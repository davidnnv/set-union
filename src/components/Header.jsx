import { useEffect, useState } from 'react';
import { useApp } from '../App.jsx';
import { PRODUCTS } from '../data/content.js';
import { href } from '../router.js';
import Logo from './Logo.jsx';

export default function Header() {
  const { t, lang, setLang, route } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route, lang]);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isProduct = PRODUCTS.some((p) => p.slug === route);

  return (
    <header className={`site-header${open ? ' is-open' : ''}`}>
      <div className="wrap header-row">
        <a className="brand" href={href('')} aria-label="SET-UNION — home">
          <Logo animate />
        </a>

        <nav className="nav" aria-label={t.menu}>
          <ul>
            <li><a href={href('')} aria-current={route === '' ? 'page' : undefined}>{t.nav.home}</a></li>
            {PRODUCTS.map((p) => (
              <li key={p.slug} className="nav-product">
                <a href={href(p.slug)} aria-current={route === p.slug ? 'page' : undefined} data-tone={p.tone}>
                  <span className="dot" aria-hidden="true" />
                  {p[lang].short}
                </a>
              </li>
            ))}
            <li><a href={href('about')} aria-current={route === 'about' ? 'page' : undefined}>{t.nav.about}</a></li>
            <li><a href={href('contact')} aria-current={route === 'contact' ? 'page' : undefined}>{t.nav.contact}</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="lang"
            onClick={() => setLang(lang === 'mk' ? 'en' : 'mk')}
            aria-label={t.langSwitchLabel}
          >
            {t.langSwitch}
          </button>
          <a className="btn btn-ink header-cta" href={href('contact')}>{t.ctaQuote}</a>
          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr">{open ? t.close : t.menu}</span>
            <span className="burger-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" hidden={!open}>
        <div className="wrap">
          <a href={href('')}>{t.nav.home}</a>
          <p className="mobile-label">{t.nav.products}</p>
          {PRODUCTS.map((p) => (
            <a key={p.slug} href={href(p.slug)} data-tone={p.tone} className="mobile-product">
              <span className="dot" aria-hidden="true" />{p[lang].title}
            </a>
          ))}
          <a href={href('about')}>{t.nav.about}</a>
          <a href={href('contact')}>{t.nav.contact}</a>
        </div>
      </div>
      {isProduct && <div className="tone-rule" data-tone={PRODUCTS.find((p) => p.slug === route).tone} />}
    </header>
  );
}
