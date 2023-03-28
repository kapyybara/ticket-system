import { useMemo, useRef, useState } from 'react';

type Class<T> = new (...args: any[]) => T;

interface A extends Object {}

export const useOldModel = <T extends object>(ModelCls: Class<T>): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [model, setModel] = useState<T>(new ModelCls());

  const modelProxy = new Proxy<T>(model, {
    // @ts-ignore
    set(obj: T, prop: keyof T, value) {
      if (!Object.is(obj[prop], value)) {
        setModel((oldObj) => {
          const newModel = new ModelCls();
          Object.assign(newModel, oldObj);
          newModel[prop] = value;
          return newModel;
        });
      }
      return true;
    },
  });

  return [modelProxy, setModel];
};

export function useModel<T extends object>(Model: Class<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const ref = useRef(new Model());
  const [, force] = useState(null);

  return useMemo(() => {
    const handler: any = {
      set(obj: any, key: any, value: any) {
        if (!Object.is(obj[key], value)) {
          Reflect.set(obj, key, value);
          force(Object.assign({}));
        }
        return true;
      },
      get(obj: any, key: any): any {
        if (obj.hasOwnProperty(key) == true && typeof obj[key] == 'object') {
          return new Proxy(Reflect.get(obj, key), handler);
        }

        return Reflect.get(obj, key);
      },
    };

    function set(payload: any) {
      ref.current = Object.assign(ref.current, payload);
      force(Object.assign({}));
    }

    return [new Proxy(ref.current, handler), set];
  }, []);
}

// export function useModel<T extends object>(Model: Class<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
//   const model: any = useRef(new Model());
//   const [next, force] = useState(null);

//   return useMemo(() => {
//     model.store = {};

//     const methods = new Proxy(model.current, {
//       set(target: any, key: any, value: any) {
//         if (!model.store.hasOwnProperty(key)) Reflect.set(model.store, key, createValue(value));
//         model.store[key].value = value;
//         Reflect.set(target, key, value);
//         return true;
//       },
//     });

//     const handler = {
//       get(node: any, key: any) {
//         if (methods[key] != null && !methods.hasOwnProperty(key)) {
//           return Reflect.get(methods, key).bind(methods);
//         }

//         if (!node.hasOwnProperty(key)) {
//           Reflect.set(node, key, createValue(null));
//           Reflect.set(model.current, key, null);
//         }

//         return Reflect.get(node, key);
//       },
//       set: () => true,
//     };

//     function set(payload: any) {
//       model.current = Object.assign(model.current, payload);
//       force(Object.assign({}));
//     }

//     return [new Proxy(model.store, handler), set];
//   }, [next]);
// }
