'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Workflow as WorkflowIcon, Activity, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { EmptyState } from '@/components/ui/empty-state';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import { WorkflowDefinition } from '@/types';

const MOCK_WORKFLOWS: WorkflowDefinition[] = [
  {
    id: 'wf-1',
    name: 'Invoice Processing',
    description: 'Automatically extract data from incoming invoices and route for approval.',
    organization_id: 'org-1',
    trigger_type: 'webhook',
    status: 'active',
    config: {},
    created_at: '2023-10-01T10:00:00Z',
    updated_at: '2023-10-15T12:00:00Z'
  },
  {
    id: 'wf-2',
    name: 'Customer Onboarding',
    description: 'Send welcome emails and set up CRM records for new signups.',
    organization_id: 'org-1',
    trigger_type: 'event',
    status: 'active',
    config: {},
    created_at: '2023-10-02T11:00:00Z',
    updated_at: '2023-10-10T09:00:00Z'
  },
  {
    id: 'wf-3',
    name: 'Weekly Sales Report',
    description: 'Aggregate sales data and send summary to Slack every Monday.',
    organization_id: 'org-1',
    trigger_type: 'schedule',
    status: 'active',
    config: {},
    created_at: '2023-10-05T08:00:00Z',
    updated_at: '2023-10-18T14:30:00Z'
  },
  {
    id: 'wf-4',
    name: 'Support Ticket Triage',
    description: 'Categorize incoming support tickets using LLM and assign priority.',
    organization_id: 'org-1',
    trigger_type: 'webhook',
    status: 'draft',
    config: {},
    created_at: '2023-10-10T15:00:00Z',
    updated_at: '2023-10-10T15:00:00Z'
  },
  {
    id: 'wf-5',
    name: 'Employee Offboarding',
    description: 'Revoke access and notify IT when an employee leaves.',
    organization_id: 'org-1',
    trigger_type: 'manual',
    status: 'archived',
    config: {},
    created_at: '2023-09-01T09:00:00Z',
    updated_at: '2023-09-01T09:00:00Z'
  }
];

export default function WorkflowsPage() {
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');

  const filteredWorkflows = MOCK_WORKFLOWS.filter((wf) => {
    if (filter === 'Active') return wf.status === 'active';
    if (filter === 'Inactive') return wf.status !== 'active';
    return true;
  });

  const columns = [
    {
      key: 'name',
      title: 'Name',
      render: (row: WorkflowDefinition) => (
        <div className="flex flex-col">
          <Link href={`/workflows/${row.id}`} className="font-medium text-[var(--text-primary)] hover:text-[var(--accent-indigo)] transition-colors">
            {row.name}
          </Link>
          <span className="text-sm text-[var(--text-muted)] truncate max-w-[300px]">{row.description}</span>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (row: WorkflowDefinition) => (
        <div className="flex items-center gap-2">
          <StatusIndicator status={row.status === 'active' ? 'success' : row.status === 'archived' ? 'error' : 'default'} />
          <span className="capitalize">{row.status}</span>
        </div>
      )
    },
    {
      key: 'trigger_type',
      title: 'Trigger',
      render: (row: WorkflowDefinition) => (
        <Badge variant="outline" className="capitalize">
          {row.trigger_type}
        </Badge>
      )
    },
    {
      key: 'updated_at',
      title: 'Last Updated',
      render: (row: WorkflowDefinition) => (
        <span className="text-[var(--text-muted)]">
          {new Date(row.updated_at).toLocaleDateString()}
        </span>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row: WorkflowDefinition) => (
        <div className="flex items-center gap-2">
          <Link href={`/workflows/${row.id}`}>
            <Button variant="outline" size="sm" className="h-8">
              View
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Run Now">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Workflows</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage and monitor your automated business processes.</p>
        </div>
        <Link href="/workflows/create">
          <Button className="bg-[var(--accent-indigo)] text-white hover:opacity-90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Workflow
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2 border-b border-[var(--surface-raised)] pb-4">
        {['All', 'Active', 'Inactive'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab
                ? 'bg-[var(--surface-overlay)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {MOCK_WORKFLOWS.length === 0 ? (
        <EmptyState
          icon={<WorkflowIcon className="h-12 w-12 text-[var(--text-muted)]" />}
          title="No workflows yet"
          description="Describe a process below to create one"
          action={
            <Link href="/workflows/create">
              <Button className="bg-[var(--accent-indigo)] text-white">Create Workflow</Button>
            </Link>
          }
        />
      ) : (
        <div className="bg-[var(--surface-base)] rounded-lg border border-[var(--surface-raised)] overflow-hidden">
          <DataTable columns={columns} data={filteredWorkflows} />
        </div>
      )}
    </div>
  );
}
