import React, { useEffect, forwardRef } from 'react';

import $ from './style.module.scss';

import cn from 'classnames';

export default forwardRef(function Button({ children, className, ...props }: any, ref: any) {
  return (
    <button className={cn($.button, className)} {...props} ref={ref}>
      {children}
    </button>
  );
});

export function ButtonDropdown({ children, className }: any) {
  return <div className={cn('dropdown', className)}>{children}</div>;
}
