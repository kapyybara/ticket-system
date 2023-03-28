import { Fragment, createElement, useState, useRef, useLayoutEffect, forwardRef } from 'react';

export { Fragment };

import * as runtime from 'react/jsx-dev-runtime';

import { parser } from './jsx-runtime';

export function jsxDEV($type: any, $props: any, key: any, isStaticChildren: boolean, source: any, self: any) {
  const { type, props } = parser($type, $props);

  return (runtime as any).jsxDEV(type, props, key, isStaticChildren, source, self);
}
