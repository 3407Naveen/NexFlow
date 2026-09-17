'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Settings, Activity, Clock, Database, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { WorkflowCanvas } from '@/components/workflow/workflow-canvas';
import { DataTable } from '@/components/ui/data-table';
import { WorkflowRun } from '@/types';

const MOCK_NODES = [
  { id: '1', type: 'trigger-node', position: { x: 250, y: 50 }, data: { label: 'Webhook Received', type: 'trigger', triggerType: 'webhook' } },
  { id: '2', type: 'agent-node', position: { x: 250, y: 150 }, data: { label: 'Extract Data', type: 'agent', agentType: 'worker', status: 'completed' } },
  { id: '3', type: 'approval-node', position: { x: 250, y: 250 }, data: { label: 'Manager Approval', type: 'approval', status: 'completed' } },
  { id: '4', type: 'agent-node', position: { x: 250, y: 350 }, data: { label: 'Update CRM', type: 'agent', agentType: 'worker', status: 'running' } },
  { id: '5', type: 'end-node', position: { x: 250, y: 450 }, data: { label: 'Success', type: 'end' } },
];

const MOCK_EDGES = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
  { id: 'e2-3', source: '2', target: '3', animated: false },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: false },
];

const MOCK_RUNS: WorkflowRun[] = [
  {
    id: 'run-1',
    workflow_id: 'wf-1',
    status: 'running',
    started_at: new Date().toISOString(),
    completed_at: null,
    inputs: {},
    outputs: {},
    error: null
  },
  {
    id: 'run-2',
    workflow_id: 'wf-1',
    status: 'completed',
    started_at: new Date(Date.now() - 3600000).toISOString(),
    completed_at: new Date(Date.now() - 3500000).toISOString(),
    inputs: {},
    outputs: {},
    error: null
  },
  {
    id: 'run-3',
    workflow_id: 'wf-1',
    status: 'failed',
    started_at: new Date(Date.now() - 86400000).toISOString(),
    completed_at: new Date(Date.now() - 86300000).toISOString(),
    inputs: {},
    outputs: {},
    error: 'API Rate limit exceeded'
  }
];

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const [activeTab, setActiveTab] = useState<'canvas' | 'runs' | 'settings'>('canvas');
  const [isRunning, setIsRunning] = useState(true);

  const handleRun = () => {
    setIsRunning(true);
  };

  const runsColumns = [
    {
      key: 'id',
      title: 'Run ID',
      render: (row: WorkflowRun) => <span className="font-mono text-sm">{row.id}</span>
    },
    {
      key: 'status',
      title: 'Status',
      render: (row: WorkflowRun) => (
        <div className="flex items-center gap-2">
          <StatusIndicator 
            status={row.status === 'completed' ? 'success' : row.status === 'failed' ? 'error' : row.status === 'running' ? 'warning' : 'default'} 
          />
          <span className="capitalize">{row.status}</span>
        </div>
      )
    },
    {
      key: 'duration',
      title: 'Duration',
      render: (row: WorkflowRun) => {
        if (!row.completed_at) return <span className="text-[var(--text-muted)]">-</span>;
        const ms = new Date(row.completed_at).getTime() - new Date(row.started_at).getTime();
        return <span>{Math.round(ms / 1000)}s</span>;
      }
    },
    {
      key: 'started_at',
      title: 'Started',
      render: (row: WorkflowRun) => <span>{new Date(row.started_at).toLocaleString()}</span>
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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[var(--surface-base)]">
      {/* Header */}
      <div className="p-6 border-b border-[var(--surface-raised)] flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Link href="/workflows">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mt-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Invoice Processing</h1>
                <Badge variant="outline" className="bg-[var(--surface-raised)] border-none text-[var(--text-primary)]">
                  Active
                </Badge>
              </div>
              <p className="text-[var(--text-muted)] mt-1 max-w-2xl">
                Automatically extract data from incoming invoices and route for approval.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-[var(--surface-raised)]">
              <Settings className="mr-2 h-4 w-4" /> Configure
            </Button>
            <Button 
              onClick={handleRun}
              className="bg-[var(--accent-indigo)] text-white hover:opacity-90"
              disabled={isRunning}
            >
              <Play className="mr-2 h-4 w-4" /> {isRunning ? 'Running...' : 'Run Workflow'}
            </Button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[var(--surface-raised)]">
          {[
            { id: 'canvas', label: 'Canvas', icon: Activity },
            { id: 'runs', label: 'Runs', icon: Clock },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 px-1 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--accent-indigo)] text-[var(--text-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'canvas' && (
          <WorkflowCanvas 
            initialNodes={MOCK_NODES} 
            initialEdges={MOCK_EDGES} 
            readOnly={false} 
          />
        )}
        
        {activeTab === 'runs' && (
          <div className="p-6 h-full overflow-auto">
            <div className="max-w-5xl mx-auto">
              <div className="bg-[var(--surface-overlay)] rounded-lg border border-[var(--surface-raised)] p-4 mb-6 grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <span className="text-sm text-[var(--text-muted)]">Total Runs</span>
                  <div className="text-2xl font-semibold text-[var(--text-primary)]">1,248</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-[var(--text-muted)]">Success Rate</span>
                  <div className="text-2xl font-semibold text-[var(--signal-green)]">98.2%</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-[var(--text-muted)]">Avg Duration</span>
                  <div className="text-2xl font-semibold text-[var(--text-primary)]">14.5s</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm text-[var(--text-muted)]">Cost/Run</span>
                  <div className="text-2xl font-semibold text-[var(--text-primary)]">$0.04</div>
                </div>
              </div>
              
              <div className="bg-[var(--surface-base)] rounded-lg border border-[var(--surface-raised)] overflow-hidden">
                <DataTable columns={runsColumns} data={MOCK_RUNS} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 h-full overflow-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">Workflow Settings</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-primary)]">Name</label>
                  <input type="text" defaultValue="Invoice Processing" className="w-full bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-indigo)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--text-primary)]">Description</label>
                  <textarea defaultValue="Automatically extract data from incoming invoices and route for approval." className="w-full h-24 bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-indigo)] resize-none" />
                </div>
                <Button className="bg-[var(--accent-indigo)] text-white">Save Changes</Button>
              </div>
              
              <div className="bg-[var(--surface-overlay)] border border-[var(--signal-red)]/20 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-medium text-[var(--signal-red)]">Danger Zone</h3>
                <p className="text-sm text-[var(--text-muted)]">Archive or delete this workflow. This action cannot be undone.</p>
                <Button variant="outline" className="border-[var(--signal-red)] text-[var(--signal-red)] hover:bg-[var(--signal-red)]/10">Archive Workflow</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
