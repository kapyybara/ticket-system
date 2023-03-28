import { Grid } from 'ag-grid-community';
import { forwardRef, useLayoutEffect, useRef } from 'react';
import tippy from 'tippy.js';

import $ from './style.module.scss';

// -- resources
import { ReactComponent as IconExclaimation } from '@/assets/exclaimation.svg';
import { ReactComponent as IconEdit } from '@/assets/pen.svg';
import IconDelete from '@/assets/trash.svg';
// -- resources

import Modal, { Confirmation } from '@/src/components/modal';
import { Slot } from '@/src/components/portal';
import { useEventRef } from '@/src/hooks/use-event';
import ToElement from '@/src/util/ag-react-cell-renderer';

import TypeComponent from './ag-grid.components/type.component';
import CheckBoxComponent from './ag-grid.components/checkbox.component';

// import { MasterDataDef } from '@ithan/core';
import { useValue, useComputed } from '@/src/hooks/useValue';
import { useModel } from '@/src/hooks/useModel';
import { useParams } from 'react-router-dom';

const tbl_mdata_attributes: any = {
  suppressContextMenu: true,
  singleClickEdit: true,
  popupParent: document.querySelector('body'),
  getContextMenuItems: getContextMenuItems,
  columnDefs: [
    { field: 'name', editable: true },
    { field: 'code', editable: true },
    {
      field: 'type',
      editable: true,
      cellRenderer: ToElement(TypeComponent),
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: ['boolean', 'text', 'number', 'timestamp'],
        cellHeight: 20,
        cellRenderer: ToElement(TypeComponent),
        searchDebounceDelay: 500,
      },
    },
    {
      field: 'visible',
      cellRenderer: ToElement(CheckBoxComponent),
    },
  ],
  defaultColDef: { flex: 1 },
  rowData: [],
};

function applyInputError(element: Element, errorMessage: string) {
  element.classList.add('error');

  const icon = ToElement(IconExclaimation, 'icon')();

  element.parentElement?.appendChild(icon);

  tippy(icon, { content: errorMessage });
}

function clearInputError(element: Element) {
  element.classList.remove('error');
  const icon = element.parentElement?.querySelector('.icon');
  icon && element.parentElement?.removeChild(icon);
}

import { isEditModeDisabled } from '.';

export default function EditView() {
  const evt = useEventRef();
  // const [model, set]: any = useModel(MasterDataDef);

  const { id } = useParams();
  // const name = useValue();
  // const code = useValue();
  // const description = useValue();

  evt.buttonAddField.onClick = function () {
    evt.table.api.applyTransaction({
      add: [
        {
          visible: true,
          name: null,
          code: null,
          type: 'text',
        },
      ],
    });
  };

  useLayoutEffect((): any => {
    // document.getElementById("root")._reactRootContainer._internalRoot.current

    if (evt.current) {
      const grid: any = new Grid(evt.current, tbl_mdata_attributes);

      evt.table.current = grid;

      evt.table.api = grid.gridOptions.api;

      return () => grid.destroy();
    }
  }, []);

  evt.name.onBlur = function (e: any) {
    // model.setName(e.target.value);
  };

  evt.button_edit.onClick = function () {
    isEditModeDisabled.value = !isEditModeDisabled.value;
    evt.table.current.gridOptions.suppressContextMenu = isEditModeDisabled.value;
  };

  evt.button_submit.onClick = function () {
    try {
      // model.build();
    } catch (e: any) {
      applyInputError(evt.desc.current, e.message);
    }
  };

  const disabled_style = useComputed(() => ({ disabled: isEditModeDisabled.value }));

  const ButtonEdit = useComputed(() => {
    const value = isEditModeDisabled.value ? 'Edit' : 'End';

    return (
      <button bt-type="secondary" ref={evt.button_edit}>
        <IconEdit />
        {value}
      </button>
    );
  });

  return (
    <>
      <div className={$.form}>
        <section className="form">
          <span className="test">
            Name:
            <input tabIndex={0} ref={evt.name} disabled={isEditModeDisabled} placeholder="Name" />
          </span>
          <span>
            Code: <input tabIndex={1} ref={evt.code} disabled={isEditModeDisabled} placeholder="Code" />
          </span>
          <span>
            <textarea ref={evt.desc} disabled={isEditModeDisabled} placeholder="Description" />
          </span>
        </section>

        <hr className="horizontal" />

        <section className="attr">
          <span ver-align="middle">
            Attributes
            <p hoz-align="right">
              <button bt-type="primary" ref={evt.buttonAddField} disabled={isEditModeDisabled} className={disabled_style}>
                + Add
              </button>
            </p>
          </span>
          <div ref={evt} className="ag-theme-alpine table"></div>
        </section>

        <footer>
          <button bt-type="primary" disabled={isEditModeDisabled} ref={evt.button_submit}>
            Save
          </button>
        </footer>
      </div>

      <template slot="header">
        <ButtonEdit />
      </template>
    </>
  );
}

export const NewDefinitionModal = forwardRef(function (props, ref: any) {
  const evt = useEventRef();
  // const { current: model } = useRef(new MasterDataDef());

  useLayoutEffect((): any => () => evt.table.current?.destroy?.(), []);

  const modal_props = {
    onMount: function () {
      const grid: any = new Grid(evt.current, tbl_mdata_attributes);
      evt.table.current = grid;
      evt.table.api = grid.gridOptions.api;
    },
    onClose: function () {
      evt.confirmBox.current.display(true);
      return false;
    },
  };

  const confirm_props = {
    onCancle: function () {
      evt.confirmBox.current.display(false);
    },
    onConfirm: function () {
      evt.confirmBox.current.display(false);
      ref.current.display(false);
    },
  };

  evt.button_add_field.onClick = function () {
    // const field = new Field();
    // field.setName('');
    // field.setCode('');
    // field.setType()
    // {
    //   visible: true,
    //   name: null,
    //   code: null,
    //   type: 'text',
    // },
    // evt.table.api.applyTransaction({
    //   add: [field],
    // });
    // (window as any).c = field;
  };

  evt.button_cancle.onClick = function () {
    evt.confirmBox.current.display(true);
  };

  // evt.input_name.onInput = (e: any) => model.setName(e.target.value);

  // evt.input_code.onInput = (e: any) => model.setCode(e.target.value);

  evt.button_submit.onClick = function (e: any) {
    // const fields = [];

    // evt.table.api.forEachNode((node: any) => {
    //   try {
    //     const field = new Field().setName(node.data.name).setCode(node.data.code).setType(node.data.type).build();

    //     console.log(field);
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   // fields.push();
    // });

    try {
      clearInputError(evt.input_code.current);
      clearInputError(evt.input_name.current);

      // const result = model.build();
    } catch (e: any) {
      // switch (true) {
      //   case e instanceof CodeMasterDataIsNotFoundError:
      //     handleModelError(evt.input_code.current, e.message);
      //     break;
      //   case e instanceof NameMasterDataIsNotFoundError:
      //     handleModelError(evt.input_name.current, e.message);
      //     break;
      //   default:
      //     break;
      // }
    }
  };

  evt.bt_new_def.onClick = function (e: any) {
    ref.current.display(true);
  };

  return (
    <>
      <template slot="page-header">
        <button bt-type="primary" hoz-align="right" ref={evt.bt_new_def}>
          + New Definition
        </button>
      </template>

      <Confirmation ref={evt.confirmBox} {...confirm_props}>
        There are unsaved changes. Are you sure you want to close the panel? Your changes will be lost.
      </Confirmation>

      <Modal ref={ref} className="half-page-right" {...modal_props}>
        <div className={$.form}>
          <h2>New Master Data</h2>

          <hr className="horizontal" />

          <section className="form">
            <span>
              Name:
              <input tabIndex={1} ref={evt.input_name} />
            </span>
            <span>
              Code:
              <input tabIndex={2} ref={evt.input_code} />
            </span>
            <span>
              Description: <input tabIndex={3} />
            </span>
          </section>

          <hr className="horizontal" />

          <section className="attr">
            <label>
              Attributes
              <button hoz-align="right" bt-type="primary" ref={evt.button_add_field}>
                + Field
              </button>
            </label>
            <div ref={evt} className="ag-theme-alpine table"></div>
          </section>

          <footer>
            <button bt-type="normal" ref={evt.button_cancle}>
              Cancle
            </button>
            <button bt-type="primary" ref={evt.button_submit}>
              Create
            </button>
          </footer>
        </div>
      </Modal>
    </>
  );
});

function getContextMenuItems(params: any) {
  return [
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
