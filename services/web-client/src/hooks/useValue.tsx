import { signal, computed } from '@preact/signals-core';
import { useMemo } from 'react';

import { REACTIVE_TYPE, TextNode } from '@/src/jsx-runtime';

function createNodeHandler(this: any) {
  const signal = this;

  return {
    get(ref: any, key: any) {
      if (/onChange/.test(key.toString())) return Reflect.get(signal, 'subscribe');
      if (/subscribe|value/.test(key.toString())) return Reflect.get(signal, key);
      if (/type/.test(key.toString())) return REACTIVE_TYPE;

      return Reflect.get(ref, key);
    },
    set(ref: any, key: any, value: any) {
      if (/value/.test(key.toString())) return Reflect.set(signal, key, value);
      return true;
    },
  };
}

export function createValue(value?: any) {
  const $signal: any = signal(value);

  const node = new Proxy(TextNode.bind($signal), createNodeHandler.call($signal));

  return node;
}

export function createComputed(fn: () => unknown) {
  const compute = computed(fn);

  const node = new Proxy(TextNode.bind(compute), createNodeHandler.call(compute));

  return node;
}

export function useValue<T>(value?: T): { value: T } {
  return useMemo(() => createValue(value), []);
}

export function useComputed(fn: () => unknown) {
  return useMemo(() => createComputed(fn), []);
}
