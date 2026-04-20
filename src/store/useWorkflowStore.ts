import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import { HRNode, HREdge } from '../types/workflow';
import { v4 as uuidv4 } from 'uuid';

interface WorkflowState {
  nodes: HRNode[];
  edges: HREdge[];
  selectedNodeId: string | null;
  view: 'landing' | 'designer';
  setView: (view: 'landing' | 'designer') => void;

  // Flow handlers
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Custom handlers
  addNode: (node: HRNode) => void;
  updateNodeData: (id: string, data: Partial<HRNode['data']>) => void;
  setSelectedNodeId: (id: string | null) => void;
  deleteNode: (id: string) => void;
  clearWorkflow: () => void;
  savedWorkflows: Array<{ id: string; name: string; nodes: HRNode[]; edges: HREdge[] }>;
  saveWorkflow: (name: string) => void;
  loadWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const initialNodes: HRNode[] = [];
const initialEdges: HREdge[] = [];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNodeId: null,
  view: 'landing',
  setView: (view: 'landing' | 'designer') => {
    set({ view });
  },

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as HRNode[],
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as HREdge[],
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges) as HREdge[],
    });
  },

  addNode: (node: HRNode) => {
    set({ nodes: get().nodes.concat(node) });
  },

  updateNodeData: (id: string, data: Partial<HRNode['data']>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: { ...node.data, ...data } as any, // Cast necessary due to disjoint union type
          };
        }
        return node;
      }),
    });
  },

  setSelectedNodeId: (id: string | null) => {
    set({ selectedNodeId: id });
  },

  deleteNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  clearWorkflow: () => {
    set({ nodes: [], edges: [], selectedNodeId: null });
  },

  savedWorkflows: [],

  saveWorkflow: (name: string) => {
    const newWorkflow = {
      id: uuidv4(),
      name,
      nodes: [...get().nodes],
      edges: [...get().edges],
    };
    set({
      savedWorkflows: [newWorkflow, ...get().savedWorkflows],
    });
  },

  loadWorkflow: (id: string) => {
    const workflow = get().savedWorkflows.find((w) => w.id === id);
    if (workflow) {
      set({
        nodes: [...workflow.nodes],
        edges: [...workflow.edges],
        selectedNodeId: null,
      });
    }
  },

  deleteWorkflow: (id: string) => {
    set({
      savedWorkflows: get().savedWorkflows.filter((w) => w.id !== id),
    });
  },

  theme: 'dark',
  toggleTheme: () => {
    set({ theme: get().theme === 'dark' ? 'light' : 'dark' });
  },
}));
