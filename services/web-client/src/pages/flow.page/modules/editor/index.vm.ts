import TaskNode from '@/src/components/reactflow/tasknode';
import { getLayoutedElements } from '@/src/util/reactflow';
import { UUID } from '@/src/util/uuid';
// import { PipelineDefinition, Task, TaskAttributeDefiniton, TaskDefinition, TaskOutCome } from '@ithan/core';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, addEdge, updateEdge, EdgeTypes, NodeTypes } from 'reactflow';

import 'reactflow/dist/style.css';
import CustomEdge from '@/src/components/reactflow/customedge';

const initialNodes: any[] = [];

const initialEdges: any[] = [];

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};

const nodeTypes: NodeTypes = { TaskNode };

export function useViewModel() {
  const canvasRef: any = useRef(null);

  // const [pipeDefinition, setPipeDefinition] = useModel(PipelineDefinition);

  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes] = useState(layoutedNodes);
  const [edges, setEdges] = useState(layoutedEdges);
  const [reactFlowInstance, setReactFlowInstance]: any = useState(null);
  const selectedRef = useRef(null);

  const onNodesChange = useCallback(
    //@ts-ignore
    (changes: NodeChange[]) =>
      setNodes((nds) => {
        return applyNodeChanges(changes, nds);
      }),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      //@ts-ignore
      setEdges((eds) => {
        return applyEdgeChanges(changes, eds);
      }),
    [],
  );
  // const onConnect = useCallback(
  //   //@ts-ignore
  //   (params: any) => {
  //     const source: Task = pipeDefinition.tasks[params.source];
  //     const outCome: TaskOutCome = source.taskDefinition.outcome[params.sourceHandle];
  //     const target: Task = pipeDefinition.tasks[params.target];
  //     pipeDefinition.createRelationship({
  //       source,
  //       outCome,
  //       target,
  //     });

  //     function deleteRelationship() {}
  //     return setEdges((eds) => {
  //       return addEdge(params, eds);
  //     });
  //   },
  //   [],
  // );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = canvasRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // const [first] = taskDefDragSet;

      // const newTask: Task = pipeDefinition.createTask(first);

      // function updateTask(id: Task['id'], task: Task) {
      //   pipeDefinition.tasks[id].name = task.name;
      // }

      // function deleteTask() {
      //   setNodes((nds) => nds.filter((node) => node.id !== newTask.id));
      //   pipeDefinition.deleteTask(newTask.id);
      // }

      // setNodes((nds) =>
      //   nds.concat({
      //     id: newTask.id,
      //     type,
      //     position,
      //     data: { task: newTask, deleteTask, updateTask },
      //   }),
      // );

      // taskDefDragSet.clear();
    },
    [reactFlowInstance],
  );
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge: any, newConnection: any) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: any }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onLayout = useCallback(
    (direction: string | undefined) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, direction);
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  return {
    // pipeDefinition,
    // setPipeDefinition,
    setNodes,
    setEdges,
    onLayout,
    canvasRef,
    reactFlowConfig: {
      nodes,
      edges,
      onNodesChange,
      onEdgesChange,
      // onConnect,
      nodeTypes,
      onDragOver,
      onDrop,
      onEdgeUpdate,
      onEdgeUpdateStart,
      onEdgeUpdateEnd,
      edgeTypes,
      snapToGrid: true,
      fitView: true,
      onInit: setReactFlowInstance,
    },
  };
}
