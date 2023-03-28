import React, { lazy, Suspense } from 'react';

import FlowModule from './flow.page';

import MasterDataPage from './master.page';

// import TaskModule from './task.page';

import TicketModule from './ticket.page';

import AuthModule from './auth.page';

// const TicketModule = lazy(() => import('./ticket.page'));

import { ReactComponent as ImgTable } from '@/assets/table.svg';
import { ReactComponent as IconNote } from '@/assets/note.svg';
import { ReactComponent as ImgUser } from '@/assets/user.svg';
import { ReactComponent as ImgUsers } from '@/assets/users.svg';
import { ReactComponent as ImgGear } from '@/assets/gear.svg';
import { ReactComponent as ImgBug } from '@/assets/bug.svg';
import { ReactComponent as IconProcess } from '@/assets/process.svg';
import { TestPage } from './test.page';

const ButtonTicket = function () {
  return (
    <button nav-path="flow">
      <IconProcess />
      <span>Ticket Definition</span>
      <span notification-count="normal">123</span>
      <span notification-count="good">3333</span>
      <span notification-count="alert">3</span>
      <span notification-count="warn">3</span>
    </button>
  );
};

const ButtonMasterData = (
  <button nav-path="master">
    <ImgTable />
    <span>Master Data</span>
  </button>
);

const ButtonTask = (
  <button nav-path="task">
    <IconNote />
    <span>Task Definition</span>
  </button>
);

const ButtonAuth = (
  <button nav-path="auth">
    <ImgUsers /> <span>Auths</span>
  </button>
);

const ButtonSetting = (
  <button nav-path="/settings">
    <ImgGear /> <span>Settings</span>
  </button>
);

export default [
  {
    path: 'flow/*',
    element: <FlowModule />,
    menu: ButtonTicket,
  },
  {
    path: 'master/*',
    element: <MasterDataPage />,
    menu: ButtonMasterData,
  },
  {
    path: 'test-page/*',
    element: <TestPage />,
    menu: ButtonMasterData,
  },

  // {
  //   path: 'task/*',
  //   element: <TaskModule />,
  //   menu: ButtonTask,
  // },

  // {
  //   path: 'tickets/*',
  //   element: <TicketModule />,
  //   menu: ButtonTicket,
  // },

  // {
  //   path: 'task/*',
  //   element: <TaskModule />,
  //   menu: ButtonTask,
  // },
  // {
  //   path: 'auth/*',
  //   element: <AuthModule />,
  //   menu: ButtonAuth,
  // },
  // {
  //   path: 'settings/*',
  //   element: <div />,
  //   menu: ButtonSetting,
  // },
];
