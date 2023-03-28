import React from 'react';

export default function CheckBoxComponent({ params }: any) {
  function onClick() {
    params.value = !params.value;
    params.node.data.visible = params.value;
  }

  return <input type="checkbox" defaultChecked={params.value} onClick={onClick} />;
}
