import { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData extends Record<string, unknown> {
  label: string;
  title?: string;
  errorMessage?: string;
}

export interface StartNodeData extends BaseNodeData {
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  title: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  title: string;
  actionId?: string;
  dynamicParams?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
  summaryFlag?: boolean;
}

export type HRNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export type HRNode = Node<HRNodeData, NodeType>;
export type HREdge = Edge;

export interface WorkflowSimulationStep {
  nodeId: string;
  nodeType: NodeType;
  status: 'pending' | 'success' | 'error';
  log: string;
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}
