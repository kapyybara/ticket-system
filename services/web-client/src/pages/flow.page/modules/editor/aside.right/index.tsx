import Select from '@/src/components/form/select';
import { useEventRef } from '@/src/hooks/use-event';
import React from 'react';
import $ from './style.module.scss';

export default function () {
  const evt = useEventRef(window);

  evt.resizer.onMouseDown = function (e: any) {
    const origin = { x: e.clientX };
    const offset = { x: 0 };
    document.body.style.cursor = 'ew-resize';

    function onMouseMove(e: any) {
      offset.x = e.clientX - origin.x;
      origin.x = e.clientX;
      evt.resizer.current.classList.add('dragging');
      evt.aside.current.style.width = evt.aside.current.offsetWidth - offset.x + 'px';
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

  return (
    <div className={$.container} ref={evt.aside}>
      <span ref={evt.resizer} className="resizer-y"></span>

      <header>
        <button>Input</button>
        <button>Outcome</button>
      </header>

      <div className="field">
        <input />
        <select>
          <option>string</option>
          <option>number</option>
          <option>master-data</option>
        </select>
        <input />
        <select>
          <option>string</option>
          <option>number</option>
          <option>master-data</option>
        </select>
      </div>
    </div>
  );
}
