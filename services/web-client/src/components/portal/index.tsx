import React, { ReactElement, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Portal({ children, target }: { children: ReactElement | ReactElement[]; target: { current: Element } }) {
  const [anchor, setAnchor] = useState(target?.current);

  useLayoutEffect(() => {
    if (anchor != target.current) setAnchor(target.current);
  }, []);

  return anchor ? createPortal(children, anchor) : null;
}

export function Slot({ children, target }: any) {
  if (!target) return <></>;
  return <Portal target={target} children={children} />;
}
