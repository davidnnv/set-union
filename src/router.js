import { useEffect, useState } from 'react';

// Minimal hash router: #about, #flexo, #contact …
// Works on any static host with no server config.
// To switch to clean URLs later, replace this with react-router's BrowserRouter.
export const ROUTES = ['about', 'contact', 'flexo', 'powder', 'masterbatch', 'anticorrosion'];

function read() {
  const h = window.location.hash.replace(/^#/, '');
  return ROUTES.includes(h) ? h : '';
}

export function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => {
    const on = () => {
      setRoute(read());
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export function href(route) {
  return route ? `#${route}` : '#';
}
