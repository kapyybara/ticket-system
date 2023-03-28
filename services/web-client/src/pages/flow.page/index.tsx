import React, { createRef } from 'react';

import 'reactflow/dist/style.css';

import $ from './style.module.scss';

import PageHeader from '@/src/components/navigator';

import { Navigate, Route, Routes } from 'react-router-dom';

import { useEventRef } from '@/src/hooks/use-event';
// import { TaskDefinition } from '@/../../packages/core';
import Main from './modules/editor';
import Tasks from './modules/tasks';
import { ReactComponent as IconFlow } from '@/assets/process.svg';
import { ReactComponent as IconNote } from '@/assets/note.svg';

export default function () {
  const evt = useEventRef();

  evt.add.onClick = function () {};

  return (
    <div className={$.flow}>
      <PageHeader segmentIndex="1" className="page-header">
        <span nav-path="tickets">
          <IconFlow />
          Flow
        </span>
        <hr />
        <span nav-path="tasks">
          <IconNote />
          Tasks Definition
        </span>
        <slot hoz-align="right" id="header" />
      </PageHeader>

      <div className="page-content">
        <Routes>
          <Route index path="tasks/*" element={<Tasks />} />
          <Route index path="tickets/*" element={<Main />} />
          <Route path="*" element={<Navigate to="tickets" replace />} />
        </Routes>
      </div>
    </div>
  );
}

// export const taskDefDragSet = new Set<TaskDefinition>();
