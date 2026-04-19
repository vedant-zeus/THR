import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ReactFlowProvider,
  NodeMouseHandler,
  Connection,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useWorkflowStore } from '../../store/useWorkflowStore';
import { useWorkflowValidators } from '../../hooks/useWorkflowValidators';
import { Trash2 } from 'lucide-react';
import { StartNode } from '../nodes/StartNode';
import { TaskNode } from '../nodes/TaskNode';
import { ApprovalNode } from '../nodes/ApprovalNode';
import { AutomatedNode } from '../nodes/AutomatedNode';
import { EndNode } from '../nodes/EndNode';
import { v4 as uuidv4 } from 'uuid';
import { NodeType, HRNode } from '../../types/workflow';

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export const WorkflowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setSelectedNodeId,
    selectedNodeId,
    clearWorkflow,
  } = useWorkflowStore();

  const { validateConnection, validateAddNode } = useWorkflowValidators();

  const handleConnect = useCallback(
    (connection: Connection) => {
      if (validateConnection(connection)) {
        onConnect(connection);
      }
    },
    [validateConnection, onConnect]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: HRNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: `${type} node`, title: `${type.toUpperCase()}` },
      };

      if (validateAddNode(newNode)) {
        addNode(newNode);
      }
    },
    [addNode, validateAddNode]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  return (
    <div className="reactflow-wrapper" ref={reactFlowWrapper}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={handleConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          deleteKeyCode={['Backspace', 'Delete']}
          fitView
        >
          <Panel position="top-right">
            <button 
              className="btn-simulate"
              style={{ backgroundColor: 'var(--danger)' }} 
              onClick={clearWorkflow}
              title="Clear Canvas"
            >
              <Trash2 size={16} />
              Reset Workflow
            </button>
          </Panel>
          <Background />
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};
