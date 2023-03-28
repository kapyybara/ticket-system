import React, { createRef, useLayoutEffect, useRef } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PageHeader from '@/src/components/navigator';

import SchemaEditor from './modules/schema-editor';

import $ from './style.module.scss';

import { ReactComponent as IconNote } from '@/assets/note.svg';
import { useEventRef } from '@/src/hooks/use-event';
import Select from 'react-select';
import { Grid } from 'ag-grid-community';

export const headerSlotRef: any = createRef();

export default function () {
  const evt = useEventRef();
  const nav = useNavigate();
  const lastPath: any = useRef();

  useLayoutEffect((): any => {
    const viewTblConfig: any = {
      suppressContextMenu: true,
      defaultColDef: { flex: 1 },
      rowSelection: 'single',
      columnDefs: [{ field: 'name' }, { field: 'code' }],
      rowData: [
        { name: 1, code: 1 },
        { name: 2, code: 2 },
      ],

      onRowClicked: function (grid: any) {
        const id = grid.node.data.code.toString();
        nav(id + '/' + lastPath.current);
      },
    };

    if (evt.table.current) {
      const grid: any = new Grid(evt.table.current, viewTblConfig);

      // const path = params?.['*'];
      // select default node
      // grid.gridOptions.api.forEachNode((node: any, index: number) => {
      //   if (path?.startsWith(node.data.code.toString())) node.setSelected(true);
      // });

      return () => grid.destroy();
    }
  }, []);

  return (
    <div className={$.main}>
      <header>
        <IconNote />
        <h2>Tasks Definition</h2>
        {/* <button bt-type="primary" hoz-align="right" ref={evt.bt_new_def}>
          + New Definition
        </button> */}
      </header>

      <div className="view">
        <section className="listing" ref={evt.aside}>
          <Select />
          <div ref={evt.table} className="ag-theme-alpine table" />
          <span ref={evt.resizer} className="resizer-y"></span>
        </section>
        <Routes>
          <Route path=":id/*" element={<TabView />} />
        </Routes>
      </div>
      {/* <PageHeader segmentIndex="1" className="page-header">
        <span nav-path="admin">Tasks</span>
        <span hoz-align="right" ref={headerSlotRef} />
      </PageHeader>
      <Routes>
        <Route index path="admin/*" element={<SchemaEditor />} />
        <Route path="*" element={<Navigate to="admin" replace />} />
      </Routes> */}
    </div>
  );
}

function TabView({ path }: any) {
  // const params = useParams();

  // path.current = params['*'];

  return (
    <section className="content">
      {/* <PageHeaderNav segmentIndex="2" className="page-header">
        <span nav-path="definition">
          <IconDb /> Definition
        </span>
        <hr />
        <span nav-path="data">
          <IconRow />
          Data
        </span>

        <span hoz-align="right" ref={headerSlotRef} />
      </PageHeaderNav> */}
      <Routes>
        <Route path="data" element={<EditForm />} />
        <Route path="*" element={<Navigate to="data" replace />} />
      </Routes>
    </section>
  );
}

function EditForm() {
  return (
    <div className={$.form}>
      <div className="row">
        <input placeholder="Name" />
        <input placeholder="Code" />
      </div>

      <label>Agent Group</label>
      <Select />

      <textarea placeholder="description" />

      <label>
        Fields{' '}
        <button bt-type="primary" hoz-align="right">
          + Field
        </button>
      </label>

      <div className="outcome">
        <div className="left">dsadsa</div>
        <div className="right">dsadsa</div>
      </div>
    </div>
  );
}
