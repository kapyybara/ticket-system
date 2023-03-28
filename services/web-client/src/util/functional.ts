// const nativeMap = Array.prototype.map;

export function map(arr: any[]) {
  const result: any = arr.map((value, index) => ({ value, index }));
  return result;
}

export function match(classifier: Function, pattern: any) {
  return box((box: any) => {
    const result = classifier(box.value);
    const value = pattern[result]?.(box.value) || pattern._?.(box.value);
    return value ? Object.assign(box, { value }) : box;
  });
}

export const box = (fn: Function) => (value: any, index: number) => fn({ value, index }).value;

// import { map, match } from 'src/util/functional';

// --
// const isNullMenu = ({ value }: any) => value == null;
// const Hr = ({ index }: any) => <hr key={index} />;
// const isReactConstructor = ({ value }: any) => value.menu instanceof Function;
// const MenuElement = ({ value }: any) => <Fragment key={value.menu}>{value.menu}</Fragment>;

// // function Menu(): any {
// //   const MenuReactFunction = ({ value: { menu: Menu }, index }: any) => <Menu key={index} />;

// //   return map(routes).map(
// //     match(isNullMenu, {
// //       true: Hr,
// //       false: match(isReactConstructor, {
// //         true: MenuReactFunction,
// //         false: MenuElement,
// //       }),
// //     }),
// //   );
// // }
