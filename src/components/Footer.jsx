import { useApp } from '../App.jsx';
import { COMPANY, PRODUCTS } from '../data/content.js';
import { href } from '../router.js';
import Logo from './Logo.jsx';

export default function Footer() {
  const { t, lang } = useApp();
  return (
    <footer className="site-footer">
      <div className="cmyk-bar" aria-hidden="true">
        <span data-tone="cyan" /><span data-tone="magenta" /><span data-tone="yellow" /><span data-tone="ink" />
      </div>
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tag">{t.tagline}</p>
          <p className="muted small">{lang === 'mk' ? COMPANY.nameMk : COMPANY.name}<br />{t.officeAddr}</p>
        </div>
        <div>
          <h2 className="footer-h">{t.footerProducts}</h2>
          <ul className="footer-list">
            {PRODUCTS.map((p) => <li key={p.slug}><a href={href(p.slug)}>{p[lang].title}</a></li>)}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">{t.footerCompany}</h2>
          <ul className="footer-list">
            <li><a href={href('about')}>{t.nav.about}</a></li>
            <li><a href={href('contact')}>{t.nav.contact}</a></li>
            {COMPANY.partners.map((p) => (
              <li key={p.name}><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name} ↗</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="footer-h">{t.nav.contact}</h2>
          <ul className="footer-list mono">
            <li><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></li>
            {COMPANY.phones.map((p) => <li key={p.tel}><a href={`tel:${p.tel}`}>{p.display}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="wrap footer-base">
        <span>© {new Date().getFullYear()} {COMPANY.name}. {t.footerRights}</span>
        <span className="muted">{t.otherTitle}: {t.other.join(' · ')} · {t.photosCredit}</span>
      </div>
    </footer>
  );
}
