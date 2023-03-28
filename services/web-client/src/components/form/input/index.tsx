import React, { useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import $ from './style.module.scss';

import cn from 'classnames';

import { useEventRef } from '@/src/hooks/use-event';

export default forwardRef(function Input(props: any, ref: any) {
  const evt = useEventRef();

  const { className, multiple, ...nativeProps } = props;

  if (multiple == true) return <textarea className={cn($.input, className)} {...nativeProps} ref={evt} />;

  return <input className={cn($.input, className)} {...nativeProps} ref={evt} />;
});
