'use client';

import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { TriggerNode, AgentNode, ApprovalNode, EndNode } from './workflow-nodes';

interface WorkflowCanvasProps {
  initialNodes: any[];
  initialEdges: any[];
  readOnly?: boolean;
}

const nodeTypes: NodeTypes = {
  'trigger-node': TriggerNode,
  'agent-node': AgentNode,
  'approval-node': ApprovalNode,
  'end-node': EndNode,
};

export function WorkflowCanvas({ initialNodes, initialEdges, readOnly = false }: WorkflowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-full bg-[var(--surface-base)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="dark"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
      >
        <Background color="#1F2330" gap={16} />
        <Controls 
          className="bg-[var(--surface-raised)] border border-[var(--surface-overlay)] fill-[var(--text-primary)]" 
          showInteractive={false} 
        />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'trigger-node': return '#8B90A0';
              case 'agent-node': return '#5B6EF5';
              case 'approval-node': return '#E8A33D';
              case 'end-node': return '#3FBF7F';
              default: return '#1F2330';
            }
          }}
          maskColor="rgba(14, 16, 22, 0.7)"
          className="bg-[var(--surface-raised)] border border-[var(--surface-overlay)]"
        />
      </ReactFlow>
      
      <style dangerouslySetInnerHTML={{__html: `
        .react-flow__edge-path {
          stroke: var(--text-muted);
          stroke-width: 2;
        }
        .react-flow__edge.animated .react-flow__edge-path {
          stroke: var(--accent-indigo);
          stroke-dasharray: 5;
          animation: dashdraw 1s linear infinite;
        }
        @keyframes dashdraw {
          from { stroke-dashoffset: 10; }
        }
        
        .react-flow__handle {
          width: 8px;
          height: 8px;
          background: var(--surface-overlay);
          border: 2px solid var(--text-muted);
        }
        
        .pulse-animation {
          box-shadow: 0 0 0 0 rgba(91, 110, 245, 0.4);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(91, 110, 245, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(91, 110, 245, 0); }
          100% { box-shadow: 0 0 0 0 rgba(91, 110, 245, 0); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .pulse-animation {
            animation: none;
          }
          .react-flow__edge.animated .react-flow__edge-path {
            animation: none;
          }
        }
      `}} />
    </div>
  );
}
