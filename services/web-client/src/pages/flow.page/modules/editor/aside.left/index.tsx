import React, { useState } from 'react';
// import { PipelineDefinition, Task, TaskDefinition } from '@ithan/core';

import * as a from '@ithan/core';

console.log(a);

import styles from './index.module.scss';

import { useViewModel } from './index.vm';

// import { taskDefDragSet } from '..';
import Select from '@/src/components/form/select';
import { useEventRef } from '@/src/hooks/use-event';

export function ASide(props: any) {
  // const { listTaskDefinition } = useViewModel();

  //TODO Lấy danh sach taskDefinition từ VM và hiển thị ra UI
  //TODO trong mỗi item của danh sách sẽ có nút 'Add to pipeline'
  //TODO  v khi nhấn 'add to pipeline' gọi hàm createTask và truyền task definition của item đó vào

  return (
    <div className={styles.list}>
      {/* <div className={styles['list__title']}>List Task Definition</div> */}
      <Select />
      {/* <div className="content">
        {listTaskDefinition.map((taskDefinition, i) => (
          <ListItem key={i} taskDefinition={taskDefinition} createTask={props?.createTask} />
        ))}
      </div> */}
    </div>
  );
}

// function ListItem(props: { taskDefinition: TaskDefinition; createTask?: PipelineDefinition['createTask'] }) {
//   //TODO Nhận vào thông tin một task và hiện thị thông tin gồm tên và mã code
//   //TODO khi nhấn nút 'add to pipeline' -> gọi hàm createTask
//   const { taskDefinition, createTask } = props;

//   const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
//     // taskDefDragSet.add(props.taskDefinition);
//     event.dataTransfer.setData('application/reactflow', nodeType);
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   return (
//     <div
//       className={styles['item']}
//       onDragStart={(event) => {
//         onDragStart(event, 'TaskNode');
//       }}
//       draggable
//     >
//       <div className={styles['item-name']}>{taskDefinition.name}</div>
//       <div className={styles['item-code']}>{taskDefinition.code}</div>
//     </div>
//   );
// }
