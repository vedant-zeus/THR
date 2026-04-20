import { AutomationAction, HRNode, HREdge } from '../types/workflow';

const mockAutomations: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
];

export const getAutomations = async (): Promise<AutomationAction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations);
    }, 500);
  });
};

export const simulateWorkflow = async (nodes: HRNode[], edges: HREdge[]): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const startNode = nodes.find(n => n.type === 'start');
        if (!startNode) throw new Error("Workflow must have a Start node.");

        const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const logs: string[] = [];
        logs.push(`[${getTimestamp()}] [Start] Initiated workflow: ${startNode.data.title || 'Untitled'}`);

        let currentNode = startNode;
        const visited = new Set<string>();
        
        while (currentNode) {
          if (visited.has(currentNode.id)) {
            throw new Error(`Cycle detected at node: ${currentNode.data.label}`);
          }
          visited.add(currentNode.id);

          if (currentNode.type !== 'start') {
            logs.push(`[${getTimestamp()}] [${currentNode.type.toUpperCase()}] Executed step: ${currentNode.data.label || currentNode.id}`);
          }

          if (currentNode.type === 'end') {
            logs.push(`[${getTimestamp()}] [End] Workflow completed successfully.`);
            break;
          }

          const outgoingEdges = edges.filter(e => e.source === currentNode.id);
          if (outgoingEdges.length === 0) {
            logs.push(`[${getTimestamp()}] [Warning] Reached dead end at node: ${currentNode.data.label}`);
            break;
          }

          // In this simple simulation, we just take the first outgoing edge randomly
          // A real engine would evaluate conditions.
          const nextNode = nodes.find(n => n.id === outgoingEdges[0].target);
          if (!nextNode) {
            throw new Error(`Missing target for edge: ${outgoingEdges[0].id}`);
          }

          currentNode = nextNode;
        }

        resolve(logs);
      } catch (e: any) {
        reject(e.message);
      }
    }, 1000);
  });
};
