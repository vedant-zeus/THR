import { useEffect, useState } from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { getAutomations } from '../../services/api';
import { AutomationAction, HRNode } from '../../types/workflow';
import { Trash2 } from 'lucide-react';

export const ConfigPanel = () => {
  const { nodes, selectedNodeId, updateNodeData, deleteNode } = useWorkflowStore();
  const [automations, setAutomations] = useState<AutomationAction[]>([]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) as HRNode | undefined;

  useEffect(() => {
    if (selectedNode?.type === 'automated' && automations.length === 0) {
      getAutomations().then(setAutomations);
    }
  }, [selectedNode?.type, automations.length]);

  if (!selectedNode) {
    return (
      <aside className="config-panel empty">
        <p>Select a node to configure</p>
      </aside>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Convert strings to boolean or numbers when needed
    let finalValue: any = value;
    if (e.target.type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (e.target.type === 'number') {
      finalValue = Number(value);
    }

    updateNodeData(selectedNode.id, { [name]: finalValue });
  };

  return (
    <aside className="config-panel">
      <div className="config-header">
        <h2>{selectedNode.type.toUpperCase()} Configuration</h2>
        <button className="icon-btn delete" onClick={() => deleteNode(selectedNode.id)} title="Delete Node">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={selectedNode.data.title as string || ''}
          onChange={handleChange}
          placeholder="Node Title"
        />
      </div>

      {selectedNode.type === 'task' && (
        <>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={selectedNode.data.description as string || ''}
              onChange={handleChange}
              placeholder="Task details..."
            />
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <input
              type="text"
              name="assignee"
              value={selectedNode.data.assignee as string || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={selectedNode.data.dueDate as string || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {selectedNode.type === 'approval' && (
        <>
          <div className="form-group">
            <label>Approver Role</label>
            <input
              type="text"
              name="approverRole"
              value={selectedNode.data.approverRole as string || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Auto-approve Threshold</label>
            <input
              type="number"
              name="autoApproveThreshold"
              value={selectedNode.data.autoApproveThreshold as number || ''}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {selectedNode.type === 'automated' && (
        <>
          <div className="form-group">
            <label>Action</label>
            <select
              name="actionId"
              value={selectedNode.data.actionId as string || ''}
              onChange={handleChange}
            >
              <option value="">Select an action...</option>
              {automations.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {selectedNode.type === 'end' && (
        <>
          <div className="form-group">
            <label>End Message</label>
            <input
              type="text"
              name="endMessage"
              value={selectedNode.data.endMessage as string || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="summaryFlag"
                checked={selectedNode.data.summaryFlag as boolean || false}
                onChange={handleChange}
              />
              Generate Summary
            </label>
          </div>
        </>
      )}
    </aside>
  );
};
