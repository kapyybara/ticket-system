import React, { createRef, useEffect, useLayoutEffect } from 'react';

import { Grid } from 'ag-grid-community';

import { useEventRef } from '@/src/hooks/use-event';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import IconDelete from '@/assets/trash.svg';
import IconEdit from '@/assets/pen.svg';
import IconCopy from '@/assets/copy.svg';

import $ from './style.module.scss';
import { Slot } from '@/src/components/portal';
import { headerSlotRef } from '.';

function getContextMenuItems(params: any) {
  return [
    {
      name: 'Copy Row',
      action: () => {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: [$.ag_context_menu_cell],
      icon: `<img src="${IconCopy}"/>`,
    },

    {
      name: 'Edit Row',
      action: () => {
        window.alert('Alerting about ' + params.value);
      },
      cssClasses: [$.ag_context_menu_cell],
      icon: `<img src="${IconEdit}"/>`,
    },
    'separator',
    {
      name: 'Delete Row',
      action: () => {
        params.api.applyTransaction({
          remove: [params.node.data],
        });
      },
      cssClasses: [$.ag_context_menu_cell],
      icon: `<img src="${IconDelete}"/>`,
    },
  ];
}

const viewTblConfig = {
  defaultColDef: { flex: 1 },
  pagination: true,
  paginationPageSize: 25,
  popupParent: document.querySelector('body'),
  getContextMenuItems: getContextMenuItems,
  columnDefs: [{ field: 'name' }, { field: 'code' }],
  rowData: [{ name: 1, code: 1 }],
};

export default function RecordView() {
  const { id } = useParams();

  const evt = useEventRef();

  const location = useLocation();

  const nav = useNavigate();

  evt.close.onClick = function () {
    const path_without_id = location.pathname.substring(0, location.pathname.lastIndexOf('/')); // remove last pathname
    nav(path_without_id);
  };

  useLayoutEffect((): any => {
    if (evt.current) {
      const grid = new Grid(evt.current, viewTblConfig);
      return () => grid.destroy();
    }
  }, []);

  return (
    <div className="records">
      <section className="detail">
        <div ref={evt} className="ag-theme-alpine table" />
      </section>

      {/* <footer>
        <button bt-type="normal">Cancle</button>
        <button bt-type="primary">Save</button>
      </footer> */}
    </div>
  );
}
