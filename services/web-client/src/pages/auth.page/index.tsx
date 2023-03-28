import React, { createContext, createRef, useContext, useEffect } from 'react';

import { Route, Routes, Navigate } from 'react-router-dom';

import $ from './style.module.scss';

import PageHeaderNav from '@/src/components/navigator';

import { useEventRef } from '@/src/hooks/use-event';

export const headerSlotRef: any = createRef();

export default function () {
  const evt = useEventRef();

  return (
    <div className={$.container}>
      <PageHeaderNav segmentIndex="1" className="page-header">
        <span nav-path="role">Roles</span>
        <span nav-path="policy">Policy</span>
        <span nav-path="permision">Permision</span>
        <span nav-path="service-account">Service Accounts</span>

        <span hoz-align="right" ref={headerSlotRef} />
      </PageHeaderNav>

      <Routes>
        <Route path="policy/*" element={<div />} />
        <Route path="*" element={<Navigate to="policy" replace />} />
      </Routes>
    </div>
  );
}
