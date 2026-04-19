import { Handle, Position } from '@xyflow/react';
import { UserCheck, AlertCircle } from 'lucide-react';
import { ApprovalNodeData } from '../../types/workflow';

export const ApprovalNode = ({ data }: { data: ApprovalNodeData }) => {
  return (
    <div className={`custom-node approval-node ${data.errorMessage ? 'has-error' : ''}`} title={data.errorMessage}>
      {data.errorMessage && (
        <div className="node-error-icon">
          <AlertCircle size={16} />
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <UserCheck size={16} />
        <span>{data.title || 'Approval'}</span>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
