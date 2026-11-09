import { useState } from 'react';
import { useApp } from '../App.jsx';
import { COMPANY, PRODUCTS } from '../data/content.js';
import LocationMap from '../components/LocationMap.jsx';

// Set VITE_FORM_ENDPOINT in .env (e.g. a Formspree, Getform or your own API URL)
// to send the form directly. Without it, the form prepares an email for the visitor to send.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

function CopyButton({ text, label, done }) {
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1600);
    } catch {
      const sel = window.getSelection();
      const node = document.querySelector(`[data-copy="${CSS.escape(text)}"]`);
      if (node && sel) { const r = document.createRange(); r.selectNodeContents(node); sel.removeAllRanges(); sel.addRange(r); }
    }
  };
  return <button type="button" className="copy-btn" onClick={copy}>{ok ? done : label}</button>;
}

function Field({ id, label, req, error, reqLabel, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={`f-${id}`}>
        {label}{req && <span className="req"> · {reqLabel}</span>}
      </label>
      {children}
      {error && <p className="field-error" id={`e-${id}`}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { t, lang, inquiry } = useApp();
  const f = t.form;
  const [v, setV] = useState({
    name: '', email: '', phone: '',
    product: inquiry.product || '',
    shade: inquiry.shade || '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | ready | failed

  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }));

  const productName = PRODUCTS.find((p) => p.slug === v.product)?.[lang].title || f.productAny;
  const bodyText =
    `${f.name}: ${v.name}\n${f.email}: ${v.email}\n` +
    (v.phone ? `${f.phone}: ${v.phone}\n` : '') +
    `${f.product}: ${productName}\n` +
    (v.shade ? `${f.shade.replace(/\s*\(.*\)/, '')}: ${v.shade}\n` : '') +
    `\n${v.message}`;
  const subject = `${t.ctaQuote} — ${productName}`;
  const mailto = `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

  const submit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!v.name.trim()) err.name = f.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) err.email = f.errEmail;
    if (!v.message.trim()) err.message = f.errMessage;
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`f-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    if (!ENDPOINT) { setState('ready'); return; }
    setState('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...v, productName, subject, lang }),
      });
      setState(res.ok ? 'sent' : 'failed');
    } catch {
      setState('failed');
    }
  };

  return (
    <>
      <section className="p-hero">
        <div className="wrap narrow">
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h1 className="h1">{t.contactTitle}</h1>
          <p className="lead">{t.contactLead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap contact-grid">
          <div className="form-card">
            {state === 'ready' ? (
              <div className="ready" aria-live="polite">
                <h2 className="h3">{f.ready}</h2>
                <p className="muted">{f.readyHelp}</p>
                <pre className="ready-text" data-copy={bodyText}>{bodyText}</pre>
                <div className="btn-row">
                  <a className="btn btn-ink" href={mailto}>{f.openEmail}</a>
                  <CopyButton text={bodyText} label={f.copyText} done={t.copied} />
                  <button type="button" className="btn btn-ghost" onClick={() => setState('idle')}>{f.edit}</button>
                </div>
              </div>
            ) : state === 'sent' ? (
              <p className="notice ok" role="status">{f.sent}</p>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field-row">
                  <Field id="name" label={f.name} req error={errors.name} reqLabel={f.required}>
                    <input id="f-name" autoComplete="name" value={v.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                  </Field>
                  <Field id="email" label={f.email} req error={errors.email} reqLabel={f.required}>
                    <input id="f-email" type="email" autoComplete="email" value={v.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                  </Field>
                </div>
                <div className="field-row">
                  <Field id="phone" label={f.phone} error={errors.phone} reqLabel={f.required}>
                    <input id="f-phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} />
                  </Field>
                  <Field id="product" label={f.product} error={errors.product} reqLabel={f.required}>
                    <select id="f-product" value={v.product} onChange={set('product')}>
                      <option value="">{f.productAny}</option>
                      {PRODUCTS.map((p) => <option key={p.slug} value={p.slug}>{p[lang].title}</option>)}
                    </select>
                  </Field>
                </div>
                <Field id="shade" label={f.shade} error={errors.shade} reqLabel={f.required}>
                  <input id="f-shade" className="mono" value={v.shade} onChange={set('shade')} placeholder="RAL 9005 / PANTONE 286 C" />
                </Field>
                <Field id="message" label={f.message} req error={errors.message} reqLabel={f.required}>
                  <textarea id="f-message" rows={5} value={v.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-message' : undefined} />
                </Field>
                {state === 'failed' && <p className="notice err" role="alert">{f.failed}</p>}
                <button className="btn btn-ink" type="submit" disabled={state === 'sending'}>
                  {state === 'sending' ? f.sending : f.submit}
                </button>
              </form>
            )}
          </div>

          <aside className="contact-info">
            <div className="info-block">
              <h2 className="info-h">{t.office}</h2>
              <p>{t.officeAddr}</p>
              <a className="text-link small" href="#map" onClick={(e) => { e.preventDefault(); document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.openMap} ↓</a>
              <ul className="contact-lines">
                {COMPANY.phones.map((p) => (
                  <li key={p.tel}>
                    <a className="mono" href={`tel:${p.tel}`}>{p.display}</a>
                    {p.noteKey && <span className="muted small"> {t[p.noteKey]}</span>}
                  </li>
                ))}
                <li className="email-line">
                  <span className="mono selectable" data-copy={COMPANY.email}>{COMPANY.email}</span>
                  <CopyButton text={COMPANY.email} label={t.copy} done={t.copied} />
                </li>
              </ul>
            </div>
            <div className="info-block">
              <h2 className="info-h">{t.warehouse}</h2>
              <p>{t.warehouseAddr}</p>
              <a className="text-link small" href="#map" onClick={(e) => { e.preventDefault(); document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' }); }}>{t.openMap} ↓</a>
            </div>
          </aside>
        </div>
      </section>
      <section className="section section-alt" id="map">
        <div className="wrap">
          <header className="section-head reveal">
            <p className="eyebrow">{t.mapEyebrow}</p>
            <h2 className="h2">{t.mapTitle}</h2>
            <p className="lead">{t.mapLead}</p>
          </header>
          <div className="reveal"><LocationMap /></div>
        </div>
      </section>
    </>
  );
}
