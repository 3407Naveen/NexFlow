'use client';

import React, { useState } from 'react';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { AuditLog } from '@/types';

const MOCK_AUDIT: AuditLog[] = [
  { id: 'log-101', organization_id: 'org-1', actor_type: 'user', actor_id: 'user-1', action: 'workflow.created', resource_type: 'workflow', resource_id: 'wf-4', details: { name: 'Support Ticket Triage' }, created_at: '2023-10-24T10:15:22Z' },
  { id: 'log-100', organization_id: 'org-1', actor_type: 'system', actor_id: 'system', action: 'workflow.run_started', resource_type: 'workflow_run', resource_id: 'run-912', details: { trigger: 'webhook' }, created_at: '2023-10-24T10:05:00Z' },
  { id: 'log-099', organization_id: 'org-1', actor_type: 'agent', actor_id: 'agt-1', action: 'tool.executed', resource_type: 'tool', resource_id: 'salesforce.update', details: { success: true }, created_at: '2023-10-24T09:50:11Z' },
  { id: 'log-098', organization_id: 'org-1', actor_type: 'user', actor_id: 'user-2', action: 'approval.responded', resource_type: 'approval', resource_id: 'app-3', details: { decision: 'approved' }, created_at: '2023-10-23T16:22:00Z' },
  { id: 'log-097', organization_id: 'org-1', actor_type: 'user', actor_id: 'user-1', action: 'api_key.generated', resource_type: 'api_key', resource_id: 'key-2', details: {}, created_at: '2023-10-22T11:00:00Z' },
];

export default function AuditLogPage() {
  const [filter, setFilter] = useState('');

  const columns = [
    { 
      key: 'created_at', 
      title: 'Timestamp', 
      render: (row: AuditLog) => <span className="font-mono text-xs text-[var(--text-muted)]">{new Date(row.created_at).toISOString().replace('T', ' ').substring(0, 19)}</span>
    },
    { 
      key: 'actor', 
      title: 'Actor', 
      render: (row: AuditLog) => (
        <Badge variant="outline" className={`
          capitalize text-xs font-mono
          ${row.actor_type === 'system' ? 'border-[var(--text-muted)] text-[var(--text-muted)]' : ''}
          ${row.actor_type === 'agent' ? 'border-[var(--accent-indigo)] text-[var(--accent-indigo)]' : ''}
          ${row.actor_type === 'user' ? 'border-[var(--signal-green)] text-[var(--signal-green)]' : ''}
        `}>
          {row.actor_type}: {row.actor_id.substring(0, 8)}
        </Badge>
      )
    },
    { 
      key: 'action', 
      title: 'Action', 
      render: (row: AuditLog) => <span className="font-mono text-sm text-[var(--text-primary)]">{row.action}</span>
    },
    { 
      key: 'resource', 
      title: 'Resource', 
      render: (row: AuditLog) => <span className="text-sm text-[var(--text-muted)]">{row.resource_type} ({row.resource_id.substring(0, 8)})</span>
    },
    { 
      key: 'details', 
      title: 'Details', 
      render: (row: AuditLog) => <span className="text-xs font-mono text-[var(--text-muted)] truncate max-w-[200px]">{JSON.stringify(row.details)}</span>
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Audit Log</h1>
          <p className="text-[var(--text-muted)] mt-1">Immutable record of all system, user, and agent activities.</p>
        </div>
        <Button variant="outline" className="border-[var(--surface-raised)]">
          Export CSV
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search logs..." 
            className="w-full bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-md pl-10 pr-4 py-2 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-indigo)]"
          />
        </div>
        <Button variant="outline" className="border-[var(--surface-raised)]">
          <Filter className="mr-2 h-4 w-4" /> Filters
        </Button>
      </div>

      {MOCK_AUDIT.length === 0 ? (
        <EmptyState
          icon={<ShieldAlert className="h-12 w-12 text-[var(--text-muted)]" />}
          title="No audit entries yet"
          description="Activity logs will appear here once actions are taken"
        />
      ) : (
        <div className="bg-[var(--surface-base)] rounded-lg border border-[var(--surface-raised)] overflow-hidden">
          <DataTable columns={columns} data={MOCK_AUDIT} />
        </div>
      )}
    </div>
  );
}
