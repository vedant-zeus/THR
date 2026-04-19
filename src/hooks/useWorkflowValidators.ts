import { Connection } from '@xyflow/react';
import { useWorkflowStore } from '../store/useWorkflowStore';
import { HRNode } from '../types/workflow';

export const useWorkflowValidators = () => {
  const { nodes, updateNodeData } = useWorkflowStore();

  const validateConnection = (connection: Connection): boolean => {
    const targetNode = nodes.find((n) => n.id === connection.target);
    if (targetNode?.type === 'start') {
      updateNodeData(targetNode.id, { errorMessage: "Start nodes cannot be the target of an incoming connection." });
      // Remove the error after 3 seconds so the UI clears up natively
      setTimeout(() => updateNodeData(targetNode.id, { errorMessage: undefined }), 3000);
      return false;
    }
    
    // Clear previously existing errors on success
    if (targetNode?.data.errorMessage) {
      updateNodeData(targetNode.id, { errorMessage: undefined });
    }
    return true;
  };

  const validateAddNode = (node: HRNode): boolean => {
    if (node.type === 'start') {
      const existingStart = nodes.find((n) => n.type === 'start');
      if (existingStart) {
        updateNodeData(existingStart.id, { errorMessage: "Only one Start node is permitted." });
        setTimeout(() => updateNodeData(existingStart.id, { errorMessage: undefined }), 3000);
        return false;
      }
    }
    return true;
  };

  return { validateConnection, validateAddNode };
};
