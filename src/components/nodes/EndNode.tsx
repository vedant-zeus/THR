import { Handle, Position } from '@xyflow/react';
import { Flag, AlertCircle } from 'lucide-react';
import { EndNodeData } from '../../types/workflow';

export const EndNode = ({ data }: { data: EndNodeData }) => {
  return (
    <div className={`custom-node end-node ${data.errorMessage ? 'has-error' : ''}`} title={data.errorMessage}>
      {data.errorMessage && (
        <div className="node-error-icon">
          <AlertCircle size={16} />
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <Flag size={16} />
        <span>{data.title || 'End'}</span>
      </div>
    </div>
  );
};
