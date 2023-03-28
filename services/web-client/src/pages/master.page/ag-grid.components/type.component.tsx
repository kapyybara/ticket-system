import React from 'react';

import imgText from '@/assets/text.svg';
import imgNumber from '@/assets/number.svg';
import imgBoolean from '@/assets/boolean.svg';
import imgTime from '@/assets/time.svg';

import cn from 'classnames';

import $ from './style.module.scss';

const images: any = {
  boolean: imgBoolean,
  text: imgText,
  number: imgNumber,
  timestamp: imgTime,
};

export default function TypeComponent({ params }: any) {
  const img = images[params.value]; // params.value == 'text' ? imgText : params.value == 'number' ? imgNumber : params.value == 'timestamp' ? imgTime : imgBoolean;

  return (
    <div className={cn($.ag_cell, 'type-cell')}>
      <img src={img} />
      <span>{params.value}</span>
    </div>
  );
}
