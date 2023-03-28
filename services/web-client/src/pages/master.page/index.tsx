import { createContext, createRef, useCallback, useContext, useEffect, useLayoutEffect, useRef } from 'react';

import { Route, Routes, Navigate, useNavigation, useNavigate, useParams, useLocation } from 'react-router-dom';

import $ from './style.module.scss';

import DefinitionView, { NewDefinitionModal } from './definition.view';

import RecordView from './record.view';

import PageHeaderNav from '@/src/components/navigator';

import { useEventRef } from '@/src/hooks/use-event';

import { ReactComponent as IconTable } from '@/assets/table.svg';
import { ReactComponent as IconDb } from '@/assets/db.svg';
import { ReactComponent as IconRow } from '@/assets/row.svg';
import { Grid } from 'ag-grid-community';
import Select from '@/src/components/form/select';
import { Confirmation } from '@/src/components/modal';
import { createValue, useValue } from '@/src/hooks/useValue';

export const isEditModeDisabled = createValue(true);

// master
export default function () {
  const evt = useEventRef(window);

  const nav = useNavigate();

  const lastPath: any = useRef();

  const params = useParams();

  const nextNode = useValue<any>(null);

  evt.onContextmenu = function (e: any) {
    e.preventDefault();
  };

  function gotoNode() {
    isEditModeDisabled.value = true;
    nextNode.value.setSelected(true);
    const id = nextNode.value.data.code.toString();
    nav(id + '/' + lastPath.current);
  }

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
        nextNode.value = grid.node;

        if (isEditModeDisabled.value == false) {
          evt.confirmBox.current.display(true);
          return;
        }

        gotoNode();
      },
    };

    if (evt.table.current) {
      const grid: any = new Grid(evt.table.current, viewTblConfig);

      const path = params?.['*'];
      // select default node
      grid.gridOptions.api.forEachNode((node: any, index: number) => {
        if (path?.startsWith(node.data.code.toString())) {
          node.setSelected(true);
        }
      });

      isEditModeDisabled.onChange(() => {
        grid.gridOptions.suppressRowClickSelection = !isEditModeDisabled.value;
      });

      return () => grid.destroy();
    }
  }, []);

  evt.resizer.onMouseDown = function (e: any) {
    const origin = { x: e.clientX };
    const offset = { x: 0 };
    document.body.style.cursor = 'ew-resize';

    evt.aside.current.style.width = evt.aside.current.offsetWidth + 'px';

    function onMouseMove(e: any) {
      offset.x = e.clientX - origin.x;
      origin.x = e.clientX;
      evt.resizer.current.classList.add('dragging');
      evt.aside.current.style.width = evt.aside.current.offsetWidth + offset.x + 'px';
    }

    evt.onMouseMove = onMouseMove;

    evt.onMouseUp = {
      options: { once: true },
      function() {
        evt.resizer.current.classList.remove('dragging');
        document.body.style.removeProperty('cursor');
        evt.resizer.remove(onMouseMove);
      },
    };
  };

  const confirm_props = {
    onCancle: () => evt.confirmBox.current.display(false),
    onConfirm: function () {
      evt.confirmBox.current.display(false);
      gotoNode();
    },
  };

  return (
    <>
      <NewDefinitionModal ref={evt.ctrl_new_def} />

      <Confirmation ref={evt.confirmBox} {...confirm_props}>
        There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost.
      </Confirmation>

      <div className={$.main}>
        <nav className="page-header">
          <span className="item">
            <IconTable />
            Master Data
          </span>
          <slot hoz-align="right" id="page-header" />
        </nav>
        <div className="view">
          <section className="listing" ref={evt.aside}>
            <Select />
            <div ref={evt.table} className="ag-theme-alpine table" />
            <span ref={evt.resizer} className="resizer-y"></span>
          </section>
          <Routes>
            <Route path=":id/*" element={<TabView path={lastPath} />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

function TabView({ path }: any) {
  const params = useParams();

  path.current = params['*'];

  return (
    <section className="content">
      <PageHeaderNav segmentIndex="2" className="page-header">
        <span nav-path="definition">
          <IconDb /> Definition
        </span>
        <hr />
        <span nav-path="data">
          <IconRow />
          Data
        </span>
        <slot hoz-align="right" id="header" />
      </PageHeaderNav>
      <Routes>
        <Route path="data" element={<RecordView />} />
        <Route path="definition" element={<DefinitionView />} />
        <Route path="*" element={<Navigate to="data" replace />} />
      </Routes>
    </section>
  );
}
