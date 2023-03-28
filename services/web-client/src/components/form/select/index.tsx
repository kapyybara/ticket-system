import React from 'react';
import Select from 'react-select';

export default function (props: any) {
  //
  function onInputChange(e: any, a: any) {
    console.log(e, a);
  }
  //
  return <Select {...props} onChange={onInputChange} />;
}
