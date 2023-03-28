import React, { createRef, useEffect, useLayoutEffect, useRef } from 'react';

import { Grid } from 'ag-grid-community';

import { useEventRef } from '@/src/hooks/use-event';

import $ from './style.module.scss';

import { Route, Routes, useNavigate, useNavigation } from 'react-router-dom';
import Input from '@/src/components/form/input';
import Button from '@/src/components/form/button';
import { Slot } from '@/src/components/portal';

import { headerSlotRef } from 'src/pages/task.page';
import DefineTaskModal from './define-task.modal';

const tbl_config: any = {
  columnDefs: [{ field: 'name', cellRenderer: 'agGroupCellRenderer' }, { field: 'code' }, { field: 'desc' }],
  masterDetail: true,
  detailRowHeight: 240,
  rowSelection: 'single',
  defaultColDef: { flex: 1 },
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [{ field: 'name' }, { field: 'code' }, { field: 'type' }, { field: 'target' }],
      defaultColDef: { flex: 1 },
    },
    getDetailRowData: function (params: any) {
      params.successCallback(params.data.records);
    },
  },
  rowData: [
    {
      name: 'Tạo email',
      code: 'TAO_EMAIL',
      desc: 'Tạo email cho nhân viên mới',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Gửi kết quả phỏng vấn',
      code: 'GUI_KET_QUA_PHONG_VAN',
      desc: 'Gửi kết quả phỏng vấn cho ứng cử viên',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Buổi định hướng',
      code: 'BUOI_DINH_HUONG',
      desc: 'Định hướng cho nhân viên mới',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Gửi Offer Letter',
      code: 'GUI_OFFER_LETTER',
      desc: 'Gửi Thư Offer Ứng Viên',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Tạo Thẻ Nhân Viên',
      code: 'TAO_THE_NHAN_VIEN',
      desc: 'Tạo thẻ mới cho nhân viên mới',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Mua Laptop',
      code: 'MUA_LAPTOP',
      desc: 'Mua laptop cho nhân viên mới',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Gửi Email cám ơn PV',
      code: 'GUI_EMAIL_CAM_ON_PV',
      desc: 'Gửi email cám ơn ứng viên đã phỏng vấn',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
    {
      name: 'Hỏi Interview về kết quả PV',
      code: 'HOI_INTERVIEW_VE_KET_QUA_PV',
      desc: 'hỏi người phỏng vấn về kết quả phỏng vấn',
      records: [{ name: 1, code: 1, type: 1, target: 1 }],
    },
  ],
};

export default function () {
  const evt = useEventRef();
  const nav: any = useNavigate();
  const ctrl: any = useRef();

  useLayoutEffect((): any => {
    // tbl_config.onSelectionChanged = function (e: any) {
    //   const [node] = e.api.getSelectedNodes();
    //   nav(node.data.code);
    // };

    tbl_config.onRowClicked = function (e: any) {
      const [node] = e.api.getSelectedNodes();
      nav(node);
    };

    if (evt.current) {
      const grid = new Grid(evt.current, tbl_config);

      return () => grid.destroy();
    }
  }, []);

  evt.buttonAdd.onClick = function () {
    ctrl?.current?.mount(document.body);
  };

  return (
    <div className={$.viewport}>
      <DefineTaskModal ref={ctrl} />
      <div className="group">
        <div ref={evt} className="ag-theme-alpine table" />
        <Routes>
          <Route path=":id" element={<Task_Edit_Form />} />
        </Routes>
      </div>

      <Slot target={headerSlotRef}>
        <Button hoz-align="right" bt-type="primary" ref={evt.buttonAdd}>
          + Task Data
        </Button>
      </Slot>
    </div>
  );
}

function Task_Edit_Form() {
  const evt = useEventRef();

  const ref: any = useRef();
  useEffect(() => {
    const attr_config = {
      columnDefs: [{ field: 'Name' }, { field: 'code' }, { field: 'type' }, { field: 'target' }],
      rowData: [],
    };

    new Grid(evt.current, attr_config);
    new Grid(evt.current, tbl_config.rowData.name);
    new Grid(evt.outcome.fail.current, attr_config);
  }, []);

  return (
    <div className="form" ref={ref}>
      <h4>Edit Task #id</h4>
      <hr />

      <section className="detail">
        <span>
          Name:
          <Input ref={evt} />
        </span>
        <span>
          Display Fields: <Input />
        </span>
        <span>
          Description: <Input multiple />
        </span>
      </section>

      <hr />

      <section className="attr">
        <h5>Attributes</h5>
        <div ref={evt} className="ag-theme-alpine table"></div>
        <h5>Outcome</h5>
        <div className="outcome">
          <div ref={evt.outcome.done} className="ag-theme-alpine table pass"></div>
          <div ref={evt.outcome.fail} className="ag-theme-alpine table fail"></div>
        </div>
      </section>

      <footer>
        <Button bt-type="primary">Submit</Button>
      </footer>
    </div>
  );
}
