# SET-UNION — нов веб-сајт (React + Vite)

Целосна реконструкција на set-union.com: двојазичен (МК / EN), responsive, светла и темна тема.

## Старт
```bash
npm install
npm run images   # еднаш: ја презема фотографијата на фабриката од Unsplash
npm run dev      # локален развој → http://localhost:5173
npm run build    # продукција → dist/
```
Содржината од `dist/` се качува на било кој статичен хостинг (cPanel, Netlify, Vercel, Cloudflare Pages).

## Структура
- `src/data/content.js` — **сите текстови** (МК и EN), производи, телефони, партнери, RAL нијанси
- `src/pages/` — Home, About, Product (еден шаблон за 4-те линии), Contact
- `src/components/` — Header, Footer, Logo, FanDeck (интерактивна RAL лепеза)
- `src/styles.css` — дизајн токени (бои, фонтови) на врвот од фајлот

## Контакт форма
Без поставка, формата подготвува е-пошта што посетителот ја испраќа. За директно испраќање,
копирај `.env.example` во `.env` и внеси `VITE_FORM_ENDPOINT` (Formspree, Getform или свој API).

## За довршување
- `src/components/Logo.jsx` — привремен знак; замени со оригиналното лого (SVG).
- Рутирањето е со hash (`#flexo`, `#contact`) — работи на секој хостинг без конфигурација.

## Фотографии
| Датотека | Каде се користи | Извор |
|---|---|---|
| fan-deck.jpg | Почетна, дел „За нас“ | од клиентот |
| flexo.jpg | Флексо бои | од клиентот |
| powder.jpg | Лакови во прав | од клиентот |
| masterbatch.jpg | Мастербачи | од клиентот |
| factory.jpg | Страница „За нас“ | Unsplash, Ant Rozetsky — се презема со `npm run images` |
| anticorrosion.jpg | Антикорозивни премази | од клиентот |

За да замениш слика, стави нова датотека со исто име во `public/images/`. Ако некоја недостасува, страницата прикажува обоена плоча наместо неа.

## Лого
Знакот е три мастила (цијан, магента, жолта) што се преклопуваат во една форма, а во средината се спојуваат во црно. Тоа е буквално „унија“ на бои.
- `public/brand/logo-light.svg`: лого за светла позадина
- `public/brand/logo-dark.svg`: лого за темна позадина
- `public/brand/logo-mark.svg`: само знакот (за профилни слики, печат, favicon)

## Мапа
Секцијата „Најдете нè“ (на почетната и на контакт страницата) вградува Google Maps според адресата, па пинот секогаш е на точната зграда, без API клуч.
Има и копчиња за насоки преку Google Maps, Waze и Apple Maps. Со `VITE_MAP_EMBED=off` наместо мапата се прикажува илустрација.

## Објавување (GitHub Pages)
Сајтот автоматски се објавува на **https://davidnnv.github.io/set-union/** при секој push на `main`
(`.github/workflows/deploy.yml`). Еднаш треба да се вклучи: Settings → Pages → Source: **GitHub Actions**.
