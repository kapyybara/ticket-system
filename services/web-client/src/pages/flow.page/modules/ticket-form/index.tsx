import React from 'react';

import ReactFlow, { ReactFlowProvider, Controls, ControlButton, Background } from 'reactflow';

import 'reactflow/dist/style.css';

import { TaskDefinition } from '@/../../packages/core';
import { useViewModel } from './index.vm';
import Button from '@/src/components/form/button';
import { Slot } from '@/src/components/portal';
import { headerSlotRef } from '../..';

export const taskDefDragSet = new Set<TaskDefinition>();

export default function Ticket() {
  const { pipeDefinition, onLayout, reactFlowConfig, canvasRef } = useViewModel();

  //TODO Nhận vào 1 pipeline defintion
  //TODO v Khi sữa tên trên graph Task tương ứng cũng được sửa tên
  //TODO v Khi xóa node trên graph -> gọi removeNode để xóa node tương ứng
  //TODO Khi nối hai node trên graph -> gọi addRelationship để thêm vào pipeDefinition
  //TODO Khi xóa edge trong graph -> gọi remove relationship để xóa trong pipelineDefinition
  //TODO Khi đổi đầu hoặc đuôi của edge trong graph -> gọi updaterelationship để update trong pipelineDefinition

  return (
    <ReactFlowProvider>
      <Slot target={headerSlotRef}>
        <Button hoz-align="right" bt-type="primary">
          + Save Follow
        </Button>
      </Slot>
      <div className="canvas" ref={canvasRef}>
        <ReactFlow {...reactFlowConfig}>
          <Background />
          <Controls>
            <ControlButton onClick={() => onLayout('LR')}>
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                <path d="M120 546V216h330v330H120Zm0 390V606h330v330H120Zm390-390V216h330v330H510Zm0 390V606h330v330H510ZM180 486h210V276H180v210Zm390 0h210V276H570v210Zm0 390h210V666H570v210Zm-390 0h210V666H180v210Zm390-390Zm0 180Zm-180 0Zm0-180Z" />
              </svg>
            </ControlButton>
          </Controls>
          {/* <MiniMap nodeColor={nodeColor} /> */}
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
