import { createRoot } from 'react-dom/client';

import Layout from '@/src/layout/default';

import routes from './pages/routes';

const app_version = APP_VERSION as string;

function appVersion() {
  if (localStorage.APP_VERSION != app_version) {
    localStorage.clear();
  }

  if (typeof localStorage.APP_VERSION === 'undefined' || localStorage.APP_VERSION === null) {
    localStorage.setItem('APP_VERSION', app_version);
  }
}

window.addEventListener('load', function () {
  appVersion();

  const root = Object.assign(document.createElement('div'), { className: 'root' });

  document.body.appendChild(root);

  createRoot(root).render(<Layout routes={routes} />);
});
