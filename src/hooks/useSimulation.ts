import { useState } from 'react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { simulateWorkflow } from '../services/api';

export const useSimulation = () => {
  const { nodes, edges, updateNodeData } = useWorkflowStore();
  const [logs, setLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearErrors = () => {
    nodes.forEach(n => {
      if (n.data.errorMessage) updateNodeData(n.id, { errorMessage: undefined });
    });
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    setError(null);
    setLogs([]);
    clearErrors();

    try {
      const result = await simulateWorkflow(nodes, edges);
      setLogs(result);
    } catch (err: any) {
      const errMsg = String(err);
      setError(errMsg);
      
      // Parse the mock API error string to locate which node caused the failure
      if (errMsg.includes("Cycle detected at node:")) {
        const label = errMsg.split("Cycle detected at node: ")[1];
        const cyclicNode = nodes.find(n => n.data.label === label || n.id === label);
        if (cyclicNode) updateNodeData(cyclicNode.id, { errorMessage: "Cyclic dependency detected." });
      } else if (errMsg.includes("Missing target for edge:")) {
        const edgeId = errMsg.split("Missing target for edge: ")[1];
        const missingEdge = edges.find(e => e.id === edgeId);
        if (missingEdge) updateNodeData(missingEdge.source, { errorMessage: "Outgoing connection is broken." });
      } else if (errMsg.includes("Reached dead end at node:")) {
        const label = errMsg.split("Reached dead end at node: ")[1];
        const deadNode = nodes.find(n => n.data.label === label);
        if (deadNode) updateNodeData(deadNode.id, { errorMessage: "Workflow halts here. Missing connection to end node." });
      }
    } finally {
      setIsSimulating(false);
    }
  };

  return { runSimulation, logs, isSimulating, error };
};
