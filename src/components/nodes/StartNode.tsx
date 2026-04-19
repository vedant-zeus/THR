import { Handle, Position } from '@xyflow/react';
import { Play, AlertCircle } from 'lucide-react';
import { StartNodeData } from '../../types/workflow';

export const StartNode = ({ data }: { data: StartNodeData }) => {
  return (
    <div className={`custom-node start-node ${data.errorMessage ? 'has-error' : ''}`} title={data.errorMessage}>
      {data.errorMessage && (
        <div className="node-error-icon">
          <AlertCircle size={16} />
        </div>
      )}
      <div className="node-header">
        <Play size={16} />
        <span>{data.title || 'Start'}</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
