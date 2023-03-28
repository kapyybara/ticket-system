import React, { memo, useEffect, useRef, useState } from 'react';

import { Handle, Position } from 'reactflow';
import { Task } from '@ithan/core';
import clx from 'classnames';

import styles from './index.module.scss';

function TaskNode({ data }: { data: { task: Task; deleteTask: () => void; updateTask: (id: Task['id'], newTask: Partial<Task>) => boolean } }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const { task, deleteTask, updateTask } = data;
  const nameRef = useRef(null);

  useEffect(() => {
    //@ts-ignore
    nameRef.current.value = task.name;
  }, []);

  return (
    <div className={styles['wrap']}>
      <button className={styles['taskNode__deletebtn']} onClick={deleteTask}>
        X
      </button>
      <div className={styles['taskNode']}>
        <Handle type="target" position={Position.Left} className={styles['taskNode__handle']} />
        <div className={styles['taskNode__title']}>
          <input ref={nameRef} onChange={() => setIsUpdate(true)} />
          {isUpdate && (
            <button
              onClick={() => {
                setIsUpdate(false);
                //@ts-ignore
                updateTask(task.id, { name: nameRef.current.value });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                <path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z" />
              </svg>
            </button>
          )}
        </div>
        <div className={clx(styles['taskNode__outcome'], styles['done'])}>
          <span className={clx(styles['outcome'])}>DONE</span>
          <div className={clx(styles['outcome-wrap'])}>
            {Object.values(task.taskDefinition.outcome).map(
              (outcome) =>
                outcome.outcome === 'DONE' && (
                  <div className={styles['outcome__item']} key={outcome.subOutCome}>
                    {outcome.subOutCome}
                    <Handle type="source" position={Position.Right} id={outcome.id} className={clx(styles['outcome__handle'], styles['outcome__handle-done'])} />
                  </div>
                ),
            )}
          </div>
        </div>
        <div className={clx(styles['taskNode__outcome'], styles['fail'])}>
          <div className={clx(styles['outcome'])}>FAIL</div>
          <div className={clx(styles['outcome-wrap'])}>
            {Object.values(task.taskDefinition.outcome).map(
              (outcome) =>
                outcome.outcome === 'FAIL' && (
                  <div className={styles['outcome__item']} key={outcome.subOutCome}>
                    {outcome.subOutCome}
                    <Handle type="source" position={Position.Right} id={outcome.id} className={clx(styles['outcome__handle'], styles['outcome__handle-fail'])} />
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskNode);
