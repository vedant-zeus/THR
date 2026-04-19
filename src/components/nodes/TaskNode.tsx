import { Handle, Position } from '@xyflow/react';
import { ClipboardList, AlertCircle } from 'lucide-react';
import { TaskNodeData } from '../../types/workflow';

export const TaskNode = ({ data }: { data: TaskNodeData }) => {
  return (
    <div className={`custom-node task-node ${data.errorMessage ? 'has-error' : ''}`} title={data.errorMessage}>
      {data.errorMessage && (
        <div className="node-error-icon">
          <AlertCircle size={16} />
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <ClipboardList size={16} />
        <span>{data.title || 'Task'}</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
