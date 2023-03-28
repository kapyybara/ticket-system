import React from 'react';
import { createRoot } from 'react-dom/client';

export default function ReactCellRenderer(Component: any, className: string = 'ag-react-container') {
  return function (params?: any) {
    const element = Object.assign(document.createElement('div'), { className });
    createRoot(element).render(<Component params={params} />);
    return element;
  };
}
