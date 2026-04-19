import { Play, ClipboardList, UserCheck, Cpu, Flag } from 'lucide-react';
import { NodeType } from '../../types/workflow';

export const Sidebar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Nodes</h2>
        <p>Drag and drop nodes to build your workflow</p>
      </div>
      
      <div className="sidebar-items">
        <div 
          className="sidebar-item start" 
          onDragStart={(e) => onDragStart(e, 'start')} 
          draggable
        >
          <Play size={18} />
          <span>Start Node</span>
        </div>
        
        <div 
          className="sidebar-item task" 
          onDragStart={(e) => onDragStart(e, 'task')} 
          draggable
        >
          <ClipboardList size={18} />
          <span>Task Node</span>
        </div>
        
        <div 
          className="sidebar-item approval" 
          onDragStart={(e) => onDragStart(e, 'approval')} 
          draggable
        >
          <UserCheck size={18} />
          <span>Approval Node</span>
        </div>
        
        <div 
          className="sidebar-item automated" 
          onDragStart={(e) => onDragStart(e, 'automated')} 
          draggable
        >
          <Cpu size={18} />
          <span>Automated Step</span>
        </div>
        
        <div 
          className="sidebar-item end" 
          onDragStart={(e) => onDragStart(e, 'end')} 
          draggable
        >
          <Flag size={18} />
          <span>End Node</span>
        </div>
      </div>
    </aside>
  );
};
