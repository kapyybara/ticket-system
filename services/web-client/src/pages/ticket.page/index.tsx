import React, { createRef } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PageHeader from '@/src/components/navigator';

import Button from '@/src/components/form/button';
import { useEventRef } from '@/src/hooks/use-event';
import TicketModule from './modules/ticket.module';
import { ReactComponent as IconNote } from '@/assets/note.svg';

import $ from './style.module.scss';

export default function () {
  const evt = useEventRef();

  return (
    <div className={$.main}>
      <PageHeader segmentIndex="1" className="page-header">
        <span nav-path="ticket">
          <IconNote />
          Ticket
        </span>
        <Button hoz-align="right" bt-type="primary" ref={evt.add_button}>
          + New Ticket
        </Button>
      </PageHeader>
      <Routes>
        <Route index path="ticket/*" element={<TicketModule />} />
        <Route path="*" element={<Navigate to="ticket" replace />} />
      </Routes>
    </div>
  );
}
