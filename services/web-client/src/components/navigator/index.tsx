import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { Outlet, useNavigate, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import { useNavPath } from '@/src/hooks/use-nav-path';

export default function ({ children, segmentIndex, ...props }: any) {
  const ref: any = useRef();

  useNavPath({ ref, segmentIndex });

  return (
    <nav ref={ref} {...props}>
      {children}
    </nav>
  );
}
