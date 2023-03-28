import { Fragment, createElement, useState, useRef, useLayoutEffect, forwardRef, isValidElement, ReactElement, useMemo } from 'react';
import { createPortal } from 'react-dom';

import * as runtime from 'react/jsx-runtime';

//support tags
const tags: any = {
  // match: ({ map: items, pattern: rule, children }: any) => {
  //   if (!items) return children;

  //   const pattern: any = {};

  //   children = children instanceof Array == false ? [children] : children;

  //   for (const element of children) {
  //     if (/value/.test(element?.type) == false) {
  //       console.warn('only element <value></value> is supported');
  //       continue;
  //     }

  //     const key = element.props.is;

  //     if (pattern[key] != null) {
  //       console.warn(key + ' key in match rules already exist');
  //       continue;
  //     }

  //     pattern[key] = function ({ value, index }: any) {
  //       if (typeof element.props.children == 'string') {
  //         return element.props.children;
  //       }

  //       if (typeof element.props.children == 'function') {
  //         return createElement(element.props.children, { value });
  //       }

  //       const children = Object.assign({}, element.props.children, { props: Object.assign({}, element.props.props, { value }) });

  //       return Object.assign({}, element, { key: index, type: Fragment, props: { children } });
  //     };
  //   }

  //   if (pattern._ == null) {
  //     //
  //     pattern._ = function ({ index }: any) {
  //       return createElement(Fragment, { key: index });
  //     };
  //   }

  //   const result = map(items).map(match(rule, pattern));

  //   return result;
  // },

  // map element
  map: ({ value, children }: any) => {
    if (!value || value instanceof Array == false) return Fragment;

    const prop_name = isValidElement(children) || children instanceof Function ? 'value' : 'children'; // append value as children when user enter native element

    const type = children instanceof Function ? children : children?.type || Fragment;

    if (children.props.value != null || children.props.index != null) {
      console.warn('value & index props is reserved for map child element, please use other props');
    }

    return value.map((value: any, index: number) => {
      return createElement(type, Object.assign({ key: index, [prop_name]: value }, type != Fragment ? { index } : undefined));
    });
  },
};

export function TextNode(this: any) {
  const [, update] = useState();
  const mounted = useRef(false);

  useLayoutEffect(() => {
    const unsub = this.subscribe(() => {
      if (mounted.current == true) {
        update(Object.assign({}));
      }
    });

    mounted.current = true;
    return () => unsub();
  }, []);

  return createElement(Fragment, { children: this.value });
}

export const ElementNode = function (this: any, props: any, ref: any) {
  const newProps = Object.assign({}, props);
  const mounted = useRef(false);
  const [, update] = useState();

  for (const [key] of this.attrs) {
    newProps[key] = this.attrs.get(key).value;

    // support object based attributes
    if (newProps[key] instanceof Object) {
      const str = Object.entries(newProps[key]).reduce((str, [key, value]) => {
        return value ? str.concat(' ', key) : str;
      }, '');

      newProps[key] = str.trim();

      if (newProps[key].length == 0) delete newProps[key];
    }
  }

  newProps.ref = ref;

  useLayoutEffect(() => {
    const unsubList = new Set();

    for (const [, propVal] of this.attrs) {
      const unsub = propVal.subscribe(() => {
        if (mounted.current) update(Object.assign({}));
      });

      unsubList.add(unsub);
    }

    mounted.current = true;

    return () => {
      unsubList.forEach((unsub: any) => unsub());
    };
  }, []);

  return createElement(this.type, newProps);
};

export const Portal = function (this: any, props: any): any {
  const [slot, set]: any = useState(null);

  useLayoutEffect(() => {
    if (!slot) {
      const element = document.querySelector('slot#' + props.slot);
      if (element) set(element);
    }
  }, [slot]);

  return slot ? createPortal(props.children, slot) : Fragment;
};

export function parser(type: any, props: any) {
  // reactive text node
  if (props?.children?.type == REACTIVE_TYPE) type = TextNode.bind(props.children);

  // array of text nodes
  if (props?.children instanceof Array) {
    for (const idx in props?.children) {
      if (props?.children[idx]?.type == REACTIVE_TYPE) {
        props.key = props.key || idx;
        props.children[idx] = createElement(TextNode.bind(props?.children[idx]), props);
      }
    }
  }

  // native node
  if (typeof type == 'string') {
    // custom nodes
    if (tags.hasOwnProperty(type)) {
      props = { children: tags.map(props) };
      type = Fragment;
    }

    // slot nodes
    if (props.slot) {
      type = useMemo(() => Portal.bind({ type }), [type]);
    }

    // Reactive Attributes
    const attrs = new Map(Object.entries(props).filter(([key, value]: any) => key != 'children' && value?.type === REACTIVE_TYPE));

    if (attrs.size > 0) {
      type = useMemo(() => forwardRef(ElementNode.bind({ type, attrs })), [type]);
    }
  }

  return { type, props } as any;
}

export function jsx($type: any, $props: any, key: any, isStaticChildren: boolean) {
  const { type, props } = parser($type, $props);
  return (runtime as any).jsx(type, props, key, isStaticChildren);
}

export const jsxs = (type: any, props: any, key: any) => jsx(type, props, key, false);

export { Fragment };

export const REACTIVE_TYPE = Symbol('reactive-type');
