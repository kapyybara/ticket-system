import './light.theme.scss';

import './ag-grid.css';

import './ag-theme-alpine.css';

import 'tippy.js/dist/tippy.css';

import $ from './layout.module.scss';

// import 'ag-grid-enterprise';

import { Component, Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { useNavPath } from '@/src/hooks/use-nav-path';

import routes from '@/src/pages/routes';

import Page404 from './page404';

import { ReactComponent as ImgTable } from '@/assets/table.svg';
import { ReactComponent as IconNote } from '@/assets/note.svg';
import { ReactComponent as ImgUser } from '@/assets/user.svg';
import { ReactComponent as ImgUsers } from '@/assets/users.svg';
import { ReactComponent as ImgGear } from '@/assets/gear.svg';
import { ReactComponent as ImgBug } from '@/assets/bug.svg';
import { ReactComponent as IconProcess } from '@/assets/process.svg';

import { useEventRef } from '@/src/hooks/use-event';

import { useComputed, useValue } from '@/src/hooks/useValue';

const saved_menu_state = Boolean(localStorage.getItem('is_menu_closed') == 'true');

function MenuItem({ value, index }: any) {
  if (value == null) return <hr />;
  if (value.menu instanceof Function) return <value.menu />;
  return <Fragment>{value.menu}</Fragment>;
}

function Page({ theme }: any) {
  const evt = useEventRef();

  useNavPath({ ref: evt.menu, segmentIndex: 0 });

  theme && document.body.classList.add(theme);

  const is_menu_closed = useValue(saved_menu_state);

  const menu_closed_style = useComputed(() => ({ 'page-menu': true, mini: is_menu_closed.value }));

  evt.closeMenu.onClick = function toggleMenu() {
    is_menu_closed.value = !is_menu_closed.value;
    localStorage.setItem('is_menu_closed', is_menu_closed.value.toString());
  };

  return (
    <div className={$.layout}>
      <header>
        <ImgBug /> IAS System [ V2 ] <ImgUser hoz-align="right" />
      </header>

      <main>
        <nav ref={evt.menu} className={menu_closed_style}>
          <map value={routes}>
            <MenuItem />
          </map>
          <button className="close" ref={evt.closeMenu}></button>
        </nav>

        <div className="page-view">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// --
export default function ({ routes }: any) {
  const router = useMemo(() => {
    const page404 = { path: '/404', element: <Page404 /> };
    const root = { path: '/*', element: <Page theme="light" />, children: routes };

    return createBrowserRouter([page404, root]);
  }, []);

  return <RouterProvider router={router} />;
}
