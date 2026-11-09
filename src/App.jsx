import { createContext, useContext, useEffect, useState } from 'react';
import { UI, PRODUCTS } from './data/content.js';
import { useRoute } from './router.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';

const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);

function initialLang() {
  try {
    const saved = localStorage.getItem('su-lang');
    if (saved === 'mk' || saved === 'en') return saved;
  } catch {}
  return 'mk';
}

export default function App() {
  const route = useRoute();
  const [lang, setLang] = useState(initialLang);
  // Pre-fills the contact form when a visitor clicks "Request a quote" on a product or swatch.
  const [inquiry, setInquiry] = useState({ product: '', shade: '' });

  // Scroll reveal: elements with .reveal fade up once as they enter the viewport.
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    root.classList.add('js-reveal');
    const els = document.querySelectorAll('.reveal:not(.is-in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [route, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('su-lang', lang); } catch {}
  }, [lang]);

  const t = UI[lang];
  const product = PRODUCTS.find((p) => p.slug === route);

  useEffect(() => {
    const base = 'SET-UNION';
    const page =
      route === 'about' ? t.nav.about :
      route === 'contact' ? t.nav.contact :
      product ? product[lang].title : t.heroTitle.join(' ');
    document.title = `${page} · ${base}`;
  }, [route, lang, product, t]);

  let page;
  if (route === 'about') page = <About />;
  else if (route === 'contact') page = <Contact />;
  else if (product) page = <Product product={product} />;
  else page = <Home />;

  return (
    <AppCtx.Provider value={{ lang, setLang, t, route, inquiry, setInquiry }}>
      <a className="skip" href="#main-content" onClick={(e) => { e.preventDefault(); document.getElementById('main-content')?.focus(); }}>
        {lang === 'mk' ? 'Прескокни до содржина' : 'Skip to content'}
      </a>
      <Header />
      <div className="print-pass" key={'pp-' + route} aria-hidden="true"><span /><span /><span /><span /></div>
      <main id="main-content" tabIndex={-1} key={route + lang}>
        {page}
      </main>
      <Footer />
    </AppCtx.Provider>
  );
}
