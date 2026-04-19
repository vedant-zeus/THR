import { useWorkflowStore } from '../../store/useWorkflowStore';
import { useSimulation } from '../../hooks/useSimulation';
import { PlayCircle } from 'lucide-react';

export const Sandbox = () => {
  const { nodes } = useWorkflowStore();
  const { runSimulation, logs, isSimulating, error } = useSimulation();

  return (
    <div className="sandbox-panel">
      <div className="sandbox-header">
        <h3>Simulation Sandbox</h3>
        <button 
          className="btn-simulate" 
          onClick={runSimulation} 
          disabled={isSimulating || nodes.length === 0}
        >
          <PlayCircle size={16} />
          {isSimulating ? 'Simulating...' : 'Run Simulation'}
        </button>
      </div>
      
      <div className="sandbox-content">
        {error && <div className="log-error">Validation Error: {error}</div>}
        
        {!error && logs.length > 0 && (
          <ul className="log-list">
            {logs.map((log, idx) => (
              <li key={idx} className="log-item">{log}</li>
            ))}
          </ul>
        )}

        {!error && logs.length === 0 && (
          <div className="empty-logs">Ready to simulate workflow...</div>
        )}
      </div>
    </div>
  );
};
