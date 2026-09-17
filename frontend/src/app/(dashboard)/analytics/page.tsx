'use client';

import React, { useState } from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, Activity, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';
import { WorkflowRun } from '@/types';

const RECENT_RUNS: WorkflowRun[] = [
  { id: 'run-912', workflow_id: 'wf-1', status: 'completed', started_at: '2023-10-24T10:05:00Z', completed_at: '2023-10-24T10:05:12Z', inputs: {}, outputs: {}, error: null },
  { id: 'run-911', workflow_id: 'wf-2', status: 'completed', started_at: '2023-10-24T09:45:00Z', completed_at: '2023-10-24T09:46:15Z', inputs: {}, outputs: {}, error: null },
  { id: 'run-910', workflow_id: 'wf-1', status: 'failed', started_at: '2023-10-24T09:15:00Z', completed_at: '2023-10-24T09:15:08Z', inputs: {}, outputs: {}, error: 'API Timeout' },
  { id: 'run-909', workflow_id: 'wf-3', status: 'completed', started_at: '2023-10-24T08:00:00Z', completed_at: '2023-10-24T08:02:45Z', inputs: {}, outputs: {}, error: null },
  { id: 'run-908', workflow_id: 'wf-1', status: 'completed', started_at: '2023-10-23T15:30:00Z', completed_at: '2023-10-23T15:30:14Z', inputs: {}, outputs: {}, error: null },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');

  const columns = [
    { key: 'id', title: 'Run ID', render: (row: WorkflowRun) => <span className="font-mono text-sm">{row.id}</span> },
    { key: 'workflow_id', title: 'Workflow', render: (row: WorkflowRun) => <span>{row.workflow_id === 'wf-1' ? 'Invoice Processing' : row.workflow_id === 'wf-2' ? 'Customer Onboarding' : 'Weekly Report'}</span> },
    { key: 'status', title: 'Status', render: (row: WorkflowRun) => (
      <div className="flex items-center gap-2">
        <StatusIndicator status={row.status === 'completed' ? 'success' : 'error'} />
        <span className="capitalize text-sm">{row.status}</span>
      </div>
    )},
    { key: 'duration', title: 'Duration', render: (row: WorkflowRun) => {
      const ms = new Date(row.completed_at!).getTime() - new Date(row.started_at).getTime();
      return <span className="text-sm">{Math.round(ms / 1000)}s</span>;
    }},
    { key: 'started_at', title: 'Time', render: (row: WorkflowRun) => <span className="text-sm text-[var(--text-muted)]">{new Date(row.started_at).toLocaleString()}</span> }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Analytics</h1>
          <p className="text-[var(--text-muted)] mt-1">Monitor workflow performance, usage, and costs.</p>
        </div>
        <div className="flex bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-md p-1">
          {[
            { id: '7d', label: 'Last 7 days' },
            { id: '30d', label: 'Last 30 days' },
            { id: 'all', label: 'All time' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors ${
                dateRange === range.id
                  ? 'bg-[var(--surface-raised)] text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Runs', value: '1,248', trend: '+12%', icon: Activity, color: 'text-[var(--accent-indigo)]' },
          { label: 'Success Rate', value: '98.2%', trend: '+0.4%', icon: TrendingUp, color: 'text-[var(--signal-green)]' },
          { label: 'Avg Duration', value: '14.5s', trend: '-2.1s', icon: Clock, color: 'text-[var(--text-primary)]' },
          { label: 'Total Cost', value: '$45.20', trend: '+$12.40', icon: DollarSign, color: 'text-[var(--text-primary)]' },
        ].map((stat, i) => (
          <div key={i} className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-[var(--text-muted)]">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-[var(--text-primary)]">{stat.value}</span>
              <span className={`text-xs font-medium ${stat.trend.startsWith('+') && stat.label !== 'Avg Duration' ? 'text-[var(--signal-green)]' : 'text-[var(--text-muted)]'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Chart Placeholder */}
        <div className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-5">
          <h3 className="text-base font-medium text-[var(--text-primary)] mb-6">Token Usage by Agent</h3>
          <div className="space-y-4">
            {[
              { name: 'Worker Agents', tokens: 850000, color: 'bg-[var(--accent-indigo)]' },
              { name: 'Coordinator Agents', tokens: 250000, color: 'bg-[var(--signal-amber)]' },
              { name: 'Approver Agents', tokens: 45000, color: 'bg-[var(--signal-green)]' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-primary)]">{item.name}</span>
                  <span className="text-[var(--text-muted)] font-mono">{item.tokens.toLocaleString()}</span>
                </div>
                <div className="w-full bg-[var(--surface-base)] rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.tokens / 850000) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-5 flex flex-col justify-center items-center h-full">
           <BarChart3 className="w-16 h-16 text-[var(--surface-raised)] mb-4" />
           <p className="text-[var(--text-muted)]">Cost breakdown visualization</p>
           <p className="text-xs text-[var(--text-muted)]/70 mt-2">Connect billing to see detailed cost analysis</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[var(--text-primary)]">Recent Activity</h3>
        <div className="bg-[var(--surface-base)] rounded-lg border border-[var(--surface-raised)] overflow-hidden">
          <DataTable columns={columns} data={RECENT_RUNS} />
        </div>
      </div>
    </div>
  );
}
