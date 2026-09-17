'use client';

import React, { useState } from 'react';
import { ListTodo, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import { Task } from '@/types';

const MOCK_TASKS: Task[] = [
  {
    id: 'task-1',
    workflow_run_id: 'run-1',
    name: 'Extract Invoice Data',
    description: 'Parse PDF and extract total amount and vendor details.',
    agent_type: 'worker',
    agent_config: { model: 'gpt-4', temperature: 0, system_prompt: '', max_tokens: 1000 },
    status: 'completed',
    started_at: new Date(Date.now() - 3600000).toISOString(),
    completed_at: new Date(Date.now() - 3590000).toISOString(),
    result: null,
    error: null
  },
  {
    id: 'task-2',
    workflow_run_id: 'run-1',
    name: 'Manager Approval',
    description: 'Require approval for amounts > $1000',
    agent_type: 'approver',
    agent_config: { model: 'gpt-4', temperature: 0, system_prompt: '', max_tokens: 1000 },
    status: 'waiting_approval',
    started_at: new Date(Date.now() - 3500000).toISOString(),
    completed_at: null,
    result: null,
    error: null
  },
  {
    id: 'task-3',
    workflow_run_id: 'run-2',
    name: 'Analyze Sentiment',
    description: 'Determine customer sentiment from recent ticket.',
    agent_type: 'worker',
    agent_config: { model: 'gpt-3.5-turbo', temperature: 0, system_prompt: '', max_tokens: 1000 },
    status: 'running',
    started_at: new Date(Date.now() - 60000).toISOString(),
    completed_at: null,
    result: null,
    error: null
  },
  {
    id: 'task-4',
    workflow_run_id: 'run-3',
    name: 'Sync CRM',
    description: 'Update user record in Salesforce.',
    agent_type: 'worker',
    agent_config: { model: 'gpt-4', temperature: 0, system_prompt: '', max_tokens: 1000 },
    status: 'failed',
    started_at: new Date(Date.now() - 7200000).toISOString(),
    completed_at: new Date(Date.now() - 7190000).toISOString(),
    result: null,
    error: 'API timeout'
  }
];

export default function TasksPage() {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredTasks = MOCK_TASKS.filter((t) => {
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Running') return t.status === 'running';
    if (statusFilter === 'Completed') return t.status === 'completed';
    if (statusFilter === 'Failed') return t.status === 'failed';
    if (statusFilter === 'Waiting Approval') return t.status === 'waiting_approval';
    return true;
  });

  const columns = [
    {
      key: 'name',
      title: 'Task Name',
      render: (row: Task) => (
        <div className="flex flex-col">
          <span className="font-medium text-[var(--text-primary)]">{row.name}</span>
          <span className="text-sm text-[var(--text-muted)] truncate max-w-[200px]">{row.description}</span>
        </div>
      )
    },
    {
      key: 'agent_type',
      title: 'Agent',
      render: (row: Task) => (
        <Badge variant="outline" className={`
          capitalize
          ${row.agent_type === 'coordinator' ? 'border-[var(--accent-indigo)] text-[var(--accent-indigo)]' : ''}
          ${row.agent_type === 'approver' ? 'border-[var(--signal-amber)] text-[var(--signal-amber)]' : ''}
          ${row.agent_type === 'worker' ? 'border-[var(--text-primary)] text-[var(--text-primary)]' : ''}
        `}>
          {row.agent_type}
        </Badge>
      )
    },
    {
      key: 'workflow',
      title: 'Workflow Run',
      render: (row: Task) => (
        <span className="text-sm font-mono text-[var(--text-muted)]">{row.workflow_run_id.substring(0, 8)}...</span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (row: Task) => (
        <div className="flex items-center gap-2">
          <StatusIndicator 
            status={
              row.status === 'completed' ? 'success' :
              row.status === 'failed' ? 'error' :
              row.status === 'running' ? 'warning' :
              row.status === 'waiting_approval' ? 'info' : 'default'
            }
          />
          <span className="capitalize text-sm">{row.status.replace('_', ' ')}</span>
        </div>
      )
    },
    {
      key: 'duration',
      title: 'Duration',
      render: (row: Task) => {
        if (!row.completed_at) return <span className="text-[var(--text-muted)]">-</span>;
        const ms = new Date(row.completed_at).getTime() - new Date(row.started_at).getTime();
        return <span className="text-sm">{Math.round(ms / 1000)}s</span>;
      }
    },
    {
      key: 'actions',
      title: '',
      render: () => (
        <Button variant="ghost" size="sm" className="h-8">
          Details <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Tasks</h1>
          <p className="text-[var(--text-muted)] mt-1">Monitor individual agent tasks across all workflow runs.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[var(--surface-raised)] pb-4 overflow-x-auto">
        {['All', 'Running', 'Completed', 'Failed', 'Waiting Approval'].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              statusFilter === tab
                ? 'bg-[var(--surface-overlay)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {MOCK_TASKS.length === 0 ? (
        <EmptyState
          icon={<ListTodo className="h-12 w-12 text-[var(--text-muted)]" />}
          title="No tasks yet"
          description="Tasks appear when workflows run"
        />
      ) : (
        <div className="bg-[var(--surface-base)] rounded-lg border border-[var(--surface-raised)] overflow-hidden">
          <DataTable columns={columns} data={filteredTasks} />
        </div>
      )}
    </div>
  );
}
