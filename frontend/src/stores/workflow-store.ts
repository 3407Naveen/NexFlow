import { create } from 'zustand';
import type { WorkflowNode, WorkflowEdge, TaskStatus } from '@/types';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  executionStatus: Map<string, TaskStatus>;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  addNode: (node: WorkflowNode) => void;
  removeNode: (nodeId: string) => void;
  updateNodeStatus: (nodeId: string, status: TaskStatus) => void;
  setSelectedNode: (nodeId: string | null) => void;
  resetExecution: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  executionStatus: new Map(),

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  addNode: (node) => 
    set((state) => ({ nodes: [...state.nodes, node] })),
  
  removeNode: (nodeId) => 
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),
    
  updateNodeStatus: (nodeId, status) => 
    set((state) => {
      const newStatus = new Map(state.executionStatus);
      newStatus.set(nodeId, status);
      return { executionStatus: newStatus };
    }),
    
  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  
  resetExecution: () => set({ executionStatus: new Map() }),
}));
