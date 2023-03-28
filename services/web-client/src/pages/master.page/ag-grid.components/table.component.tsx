import { useEventRef } from '@/src/hooks/use-event';
import React from 'react';

export default function () {
  const evt = useEventRef();
  return <div ref={evt} className="ag-theme-alpine table" />;
}
