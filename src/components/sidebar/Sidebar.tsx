import React, { useState } from 'react';
import { 
  Play, 
  ClipboardList, 
  UserCheck, 
  Cpu, 
  Flag, 
  Layers, 
  Save, 
  Users, 
  Plus, 
  Trash2, 
  ChevronRight 
} from 'lucide-react';
import { NodeType } from '../../types/workflow';
import { useWorkflowStore } from '../../store/useWorkflowStore';

type SidebarTab = 'nodes' | 'workflows' | 'members';

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<SidebarTab>('nodes');
  const [workflowName, setWorkflowName] = useState('');
  
  const { 
    saveWorkflow, 
    savedWorkflows, 
    loadWorkflow, 
    deleteWorkflow 
  } = useWorkflowStore();

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleSave = () => {
    if (workflowName.trim()) {
      saveWorkflow(workflowName);
      setWorkflowName('');
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>HR Dashboard</h2>
        <p>Orchestrate your workflow</p>
      </div>

      <nav className="sidebar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'nodes' ? 'active' : ''}`}
          onClick={() => setActiveTab('nodes')}
          title="Workflow Nodes"
        >
          <Layers size={18} />
          <span>Nodes</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'workflows' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflows')}
          title="Saved Workflows"
        >
          <Save size={18} />
          <span>Workflows</span>
        </button>
      </nav>
      
      <div className="sidebar-content">
        {activeTab === 'nodes' && (
          <div className="sidebar-items">
            <div className="sidebar-section-title">Workflow Components</div>
            
            <div className="sidebar-item start" onDragStart={(e) => onDragStart(e, 'start')} draggable>
              <Play size={18} />
              <span>Start Node</span>
            </div>
            
            <div className="sidebar-item task" onDragStart={(e) => onDragStart(e, 'task')} draggable>
              <ClipboardList size={18} />
              <span>Task Node</span>
            </div>
            
            <div className="sidebar-item approval" onDragStart={(e) => onDragStart(e, 'approval')} draggable>
              <UserCheck size={18} />
              <span>Approval Node</span>
            </div>
            
            <div className="sidebar-item automated" onDragStart={(e) => onDragStart(e, 'automated')} draggable>
              <Cpu size={18} />
              <span>Automated Step</span>
            </div>
            
            <div className="sidebar-item end" onDragStart={(e) => onDragStart(e, 'end')} draggable>
              <Flag size={18} />
              <span>End Node</span>
            </div>
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="workflows-tab">
            <div className="save-section">
              <label className="sidebar-section-title">Save Current Flow</label>
              <input 
                type="text" 
                className="save-input"
                placeholder="Workflow name..."
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
              />
              <button 
                className="save-btn" 
                onClick={handleSave}
                disabled={!workflowName.trim()}
              >
                <Plus size={16} />
                Save Workflow
              </button>
            </div>

            <div className="workflow-list-section">
              <label className="sidebar-section-title">Saved Workflows ({savedWorkflows.length})</label>
              <div className="workflow-list">
                {savedWorkflows.length === 0 ? (
                  <p className="empty-msg">No saved workflows yet.</p>
                ) : (
                  savedWorkflows.map((flow) => (
                    <div key={flow.id} className="workflow-item" onClick={() => loadWorkflow(flow.id)}>
                      <div className="workflow-item-info">
                        <span className="workflow-name">{flow.name}</span>
                        <span className="workflow-meta">{flow.nodes.length} nodes</span>
                      </div>
                      <div className="workflow-item-actions">
                        <button 
                          className="icon-btn delete-wf" 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteWorkflow(flow.id);
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                        <ChevronRight size={16} className="load-icon" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
