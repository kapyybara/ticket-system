import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Portal from 'src/components/portal';
import { useEventRef } from '@/src/hooks/use-event';

import $ from './modal.module.scss';

import cn from 'classnames';

const DEFAULT_OPTIONS = {
  enable_background_close: true,
  default_open: false,
};

const Modal = forwardRef(function ({ className, options = DEFAULT_OPTIONS, onClose, onMount, ...props }: any, ref: any) {
  const evt = useEventRef(document.body);

  const [hidden, hide] = useState(!options.default_open);

  useImperativeHandle(ref, function () {
    return {
      display: (bool: Boolean) => hide(!bool),
      mount: (el: Element) => {
        if (el) {
          evt.current = el;
          ref.current.display(true);
        } else {
          ref.current.display(false);
          evt.current = null;
        }
      },
    };
  });

  evt.background.onClick = function (e: any) {
    if (options.enable_background_close == true && e.target == evt.background.current) {
      hide(onClose?.() == false ? false : true);
    }
  };

  useEffect(() => {
    if (!hidden) onMount?.();
    requestAnimationFrame(() => evt.form.current?.classList.replace('state-close', 'state-open'));
  });

  const content = !hidden && (
    <div className={cn($.model, className)} ref={evt.background}>
      <div className="content state-close" ref={evt.form} {...props} />
    </div>
  );

  return <Portal target={evt} children={content} />;
});

export default Modal;

export const Confirmation = forwardRef(function ({ children, title = 'Confirm to close', onConfirm, onCancle, ...other }: any, ref: any) {
  return (
    <Modal {...other} ref={ref} className={$.confirm}>
      <header>{title}</header>
      <section>{children}</section>
      <footer>
        <button bt-type="normal" onClick={onCancle}>
          Cancle
        </button>
        <button bt-type="primary" onClick={onConfirm}>
          Confirm
        </button>
      </footer>
    </Modal>
  );
});
