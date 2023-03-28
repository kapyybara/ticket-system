import { useLayoutEffect, useMemo, useRef } from 'react';

const isWindow = (variable: any) => {
  return variable && variable.document && variable.location && variable.alert && variable.setInterval && true;
};

const isDocument = (variable: any) => {
  return variable && variable.body instanceof Element && true;
};

interface Event {
  options: any;
  function: any;
}

function createEvent(name: string, value: any) {
  if (typeof value == 'function') return { name, function: value };
  if (typeof value == 'object') return Object.assign({ name }, value);
}

export function useEventRef(target?: any) {
  const root: any = useRef();

  if (root.proxy) return root.proxy;

  // Implimentation

  const nodes = (root.nodes = new WeakMap());

  const events = (root.queue = new WeakMap());

  function dispatchEvent(this: any, evt: string) {
    const name = evt.replace('on', '').toLowerCase();
    const event = new Event(name);

    if (this.current instanceof Element) {
      this.current.dispatchEvent(event);
    } else {
      console.warn('Window & Document element does not support dispatch event');
    }
  }

  function createNode(ref: any, name: string) {
    if (!nodes.has(ref)) nodes.set(ref, {});

    const childs = nodes.get(ref);

    if (childs.hasOwnProperty(name)) {
      return Reflect.get(childs, name);
    }

    Reflect.set(childs, name, new Proxy({ current: null, queue: new Map() }, proxyHandler));

    return Reflect.get(childs, name);
  }

  function removeEvent(this: any, handler: any) {
    if (events.has(handler)) {
      const event = events.get(handler);

      event.ref.current?.removeEventListener(event.name, handler);

      events.delete(handler);
    }
  }

  function attachEvent(this: any, event: any) {
    const ref = this;

    if (ref.current instanceof Element || isWindow(ref.current) || isDocument(ref.current)) {
      ref.current.addEventListener(event.name, event.function, event.options);
      events.set(event.function, { name: event.name, ref });
    }
  }

  function current(this: any, value: any) {
    if (value != null && this.queue?.size > 0) {
      for (const item of this.queue) {
        const [event] = item;
        attachEvent.bind(this)(event);
      }
    }
  }

  function detach(this: any, value: any) {
    if (value == null) {
      for (const item of this.queue) {
        const [event] = item;
        removeEvent.bind(this)(item.function);
      }
    }
  }

  function on(this: any, key: any, value: any) {
    const ref = this;

    const evt = key.replace('on', '').toLowerCase();

    // //support inner event bind
    try {
      // throw error when not in context
      useLayoutEffect(() => {});
    } catch (e) {
      const event = createEvent(evt, value);

      if (ref.current == null) ref.queue.set(event, ref);
      else attachEvent.bind(ref)(event);

      return;
    }

    const event = useMemo(() => createEvent(evt, value), []);

    // useLayoutEffect((): any => {
    //   return () => {
    //     delete ref.element;
    //   };
    // }, []);

    useLayoutEffect(() => {
      //on mount event bind
      attachEvent.bind(ref)(event);

      // later mount event bind
      if (!ref.current) ref.queue.set(event, ref);
    });
  }

  const proxyHandler = {
    get(ref: any, key: any): any {
      if (Reflect.has(ref, key)) return Reflect.get(ref, key);

      if (/^remove$/.test(key)) return removeEvent.bind(ref);
      if (/^dispatch$/.test(key)) return dispatchEvent.bind(ref);

      return createNode(ref, key);
    },
    set(ref: any, key: any, value: Element | Function | Event | null): any {
      if (/^current$/.test(key)) detach.bind(ref)(value);

      if (/^on/.test(key)) {
        on.bind(ref)(key, value);
        return true;
      }

      Reflect.set(ref, key, value);

      if (/^current$/.test(key)) current.bind(ref)(value);
      return true;
    },
  };

  root.proxy = new Proxy({ current: target, queue: new Map() }, proxyHandler);

  return root.proxy;
}
