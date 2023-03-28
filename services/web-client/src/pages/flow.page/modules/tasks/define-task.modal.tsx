import Modal from '@/src/components/modal';
import React, { createRef, forwardRef, useLayoutEffect } from 'react';
import Input from '@/src/components/form/input';

import { useEventRef } from '@/src/hooks/use-event';

import { Grid } from 'ag-grid-community';

const attr_config = {
  columnDefs: [{ field: 'Name' }, { field: 'code' }, { field: 'type' }, { field: 'target' }],
  rowData: [],
};

export default forwardRef(function (props: any, ref: any) {
  const evt = useEventRef();

  useLayoutEffect(() => {
    if (!evt.current) return;

    new Grid(evt.current, attr_config);
    new Grid(evt.outcome.done.current, attr_config);
    new Grid(evt.outcome.fail.current, attr_config);
  }, []);

  return (
    <Modal ref={ref} open={props?.open || false}>
      <div className="half_page_modal">
        <h4>New Task Template</h4>
        <hr />

        <section className="detail">
          <span>
            Name:
            <Input />
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
          <button>Submit</button>
        </footer>
      </div>
    </Modal>
  );
});
