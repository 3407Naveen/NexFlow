'use client';

import React, { memo } from 'react';
import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import { Zap, Bot, Shield, Flag, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Status = 'pending' | 'running' | 'completed' | 'failed';

interface NodeData extends Record<string, unknown> {
  label: string;
  type: string;
  status?: Status;
  agentType?: string;
  triggerType?: string;
}

type CustomNodeType = Node<NodeData>;

const StatusIcon = ({ status }: { status?: Status }) => {
  if (!status || status === 'pending') return null;
  if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-[var(--signal-green)]" />;
  if (status === 'failed') return <XCircle className="w-4 h-4 text-[var(--signal-red)]" />;
  if (status === 'running') return <Loader2 className="w-4 h-4 text-[var(--accent-indigo)] animate-spin" />;
  return null;
};

export const TriggerNode = memo(({ data }: NodeProps<CustomNodeType>) => {
  return (
    <div className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-3 min-w-[200px] shadow-lg flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--surface-raised)] flex items-center justify-center">
        <Zap className="w-4 h-4 text-[var(--text-primary)]" />
      </div>
      <div className="flex-1">
        <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Trigger</div>
        <div className="text-sm font-medium text-[var(--text-primary)]">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[var(--text-muted)]" />
    </div>
  );
});
TriggerNode.displayName = 'TriggerNode';

export const AgentNode = memo(({ data }: NodeProps<CustomNodeType>) => {
  const isRunning = data.status === 'running';
  
  return (
    <div className={`bg-[var(--surface-overlay)] border rounded-lg p-3 min-w-[220px] shadow-lg relative ${
      isRunning ? 'border-[var(--accent-indigo)] pulse-animation' : 'border-[var(--surface-raised)]'
    }`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[var(--text-muted)]" />
      
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded bg-[var(--surface-raised)] flex items-center justify-center ${isRunning ? 'text-[var(--accent-indigo)]' : 'text-[var(--text-primary)]'}`}>
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[var(--accent-indigo)] uppercase tracking-wider">{data.agentType || 'Agent'}</div>
            <div className="text-sm font-medium text-[var(--text-primary)]">{data.label}</div>
          </div>
        </div>
        <StatusIcon status={data.status} />
      </div>
      
      {data.status && data.status !== 'pending' && (
        <div className="text-[10px] text-right text-[var(--text-muted)]">
          {data.status === 'running' ? 'Working...' : data.status === 'completed' ? 'Done' : 'Failed'}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[var(--text-muted)]" />
    </div>
  );
});
AgentNode.displayName = 'AgentNode';

export const ApprovalNode = memo(({ data }: NodeProps<CustomNodeType>) => {
  const isPending = data.status === 'pending';
  
  return (
    <div className={`bg-[var(--surface-overlay)] border rounded-lg p-3 min-w-[220px] shadow-lg relative ${
      isPending ? 'border-[var(--signal-amber)]' : 'border-[var(--surface-raised)]'
    }`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[var(--text-muted)]" />
      
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isPending ? 'bg-[var(--signal-amber)]/20 text-[var(--signal-amber)]' : 'bg-[var(--surface-raised)] text-[var(--text-primary)]'
        }`}>
          <Shield className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-[var(--signal-amber)] uppercase tracking-wider mb-1">Approval</div>
          <div className="text-sm font-medium text-[var(--text-primary)]">{data.label}</div>
        </div>
        <StatusIcon status={data.status} />
      </div>

      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-[var(--text-muted)]" />
    </div>
  );
});
ApprovalNode.displayName = 'ApprovalNode';

export const EndNode = memo(({ data }: NodeProps<CustomNodeType>) => {
  return (
    <div className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-full px-4 py-2 min-w-[120px] shadow-lg flex items-center justify-center gap-2">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-[var(--text-muted)]" />
      <Flag className="w-4 h-4 text-[var(--signal-green)]" />
      <span className="text-sm font-medium text-[var(--text-primary)]">{data.label}</span>
    </div>
  );
});
EndNode.displayName = 'EndNode';
