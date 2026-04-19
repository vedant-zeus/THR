import { Handle, Position } from '@xyflow/react';
import { Cpu, AlertCircle } from 'lucide-react';
import { AutomatedNodeData } from '../../types/workflow';

export const AutomatedNode = ({ data }: { data: AutomatedNodeData }) => {
  return (
    <div className={`custom-node automated-node ${data.errorMessage ? 'has-error' : ''}`} title={data.errorMessage}>
      {data.errorMessage && (
        <div className="node-error-icon">
          <AlertCircle size={16} />
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <Cpu size={16} />
        <span>{data.title || 'Automated'}</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
