import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Button } from '@/components/ui/button';
import { Activity, ShieldAlert, ListTodo, Zap, ArrowRight } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import type { TaskStatus } from '@/types';
import Link from 'next/link';

// Mock data
const recentRuns = [
  { id: 'run-1', name: 'Customer Onboarding', status: 'running' as TaskStatus, duration: 45000, timeAgo: '2 mins ago' },
  { id: 'run-2', name: 'Invoice Processing', status: 'waiting_approval' as TaskStatus, duration: 120000, timeAgo: '15 mins ago' },
  { id: 'run-3', name: 'Weekly Report Gen', status: 'completed' as TaskStatus, duration: 340000, timeAgo: '2 hours ago' },
  { id: 'run-4', name: 'Security Audit', status: 'failed' as TaskStatus, duration: 15000, timeAgo: '5 hours ago' },
  { id: 'run-5', name: 'Data Sync', status: 'completed' as TaskStatus, duration: 8000, timeAgo: '1 day ago' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Header 
        title="Welcome back" 
        description="Here's what your AI agents are orchestrating today."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-text-muted">Active Workflows</p>
              <Activity className="h-4 w-4 text-accent-indigo" />
            </div>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        
        <Card className="border-signal-amber/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-text-muted">Pending Approvals</p>
              <ShieldAlert className="h-4 w-4 text-signal-amber" />
            </div>
            <div className="text-2xl font-bold text-signal-amber">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-text-muted">Tasks Today</p>
              <ListTodo className="h-4 w-4 text-text-muted" />
            </div>
            <div className="text-2xl font-bold">148</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-text-muted">Tokens Used</p>
              <Zap className="h-4 w-4 text-text-muted" />
            </div>
            <div className="text-2xl font-bold">2.4M</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Recent Workflow Runs</h2>
          <Card>
            <div className="divide-y divide-border">
              {recentRuns.map((run) => (
                <div key={run.id} className="flex items-center justify-between p-4 hover:bg-surface-overlay transition-colors">
                  <div className="flex items-center gap-4">
                    <StatusIndicator status={run.status} />
                    <div>
                      <p className="font-medium">{run.name}</p>
                      <p className="text-xs text-text-muted">ID: {run.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm">{formatDuration(run.duration)}</p>
                      <p className="text-xs text-text-muted">{run.timeAgo}</p>
                    </div>
                    <Link href={`/workflows/${run.id}`}>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Quick Action</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-md">Generate Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-text-muted">
                Describe a business process, and NexFlow will generate a multi-agent workflow for you.
              </p>
              <textarea 
                className="w-full h-24 rounded-md border border-border bg-surface-overlay p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo resize-none"
                placeholder="e.g., Automatically review inactive CRM leads, draft re-engagement emails, and request manager approval..."
              />
              <Link href="/workflows/create">
                <Button className="w-full gap-2 mt-2">
                  <Zap className="h-4 w-4" />
                  Describe & Build Workflow
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
