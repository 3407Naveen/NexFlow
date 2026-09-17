import React from 'react';
import { Bot, Briefcase, Calculator, Users, HeadphonesIcon, Megaphone, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from '@/components/ui/status-indicator';
import { Badge } from '@/components/ui/badge';

const AGENTS = [
  {
    id: 'agt-1',
    name: 'Sales & CRM Agent',
    description: 'Manages lead qualification, CRM updates, and initial outreach.',
    icon: Briefcase,
    status: 'active',
    stats: { active_tasks: 12, completed_today: 145, tokens_used: '124K' },
    tools: ['Salesforce', 'HubSpot', 'Gmail']
  },
  {
    id: 'agt-2',
    name: 'Finance & Accounting',
    description: 'Processes invoices, handles expense approvals, and updates ledgers.',
    icon: Calculator,
    status: 'active',
    stats: { active_tasks: 3, completed_today: 42, tokens_used: '56K' },
    tools: ['QuickBooks', 'Stripe', 'PDF Extractor']
  },
  {
    id: 'agt-3',
    name: 'HR Coordinator',
    description: 'Onboards new employees, manages time-off requests, answers policy FAQs.',
    icon: Users,
    status: 'inactive',
    stats: { active_tasks: 0, completed_today: 8, tokens_used: '12K' },
    tools: ['Workday', 'Slack', 'Notion']
  },
  {
    id: 'agt-4',
    name: 'Customer Support',
    description: 'Triages incoming tickets, drafts responses, handles basic refunds.',
    icon: HeadphonesIcon,
    status: 'active',
    stats: { active_tasks: 24, completed_today: 890, tokens_used: '1.2M' },
    tools: ['Zendesk', 'Intercom', 'Knowledge Base']
  },
  {
    id: 'agt-5',
    name: 'Marketing Assistant',
    description: 'Generates social copy, schedules posts, analyzes campaign performance.',
    icon: Megaphone,
    status: 'active',
    stats: { active_tasks: 1, completed_today: 15, tokens_used: '89K' },
    tools: ['Twitter', 'LinkedIn', 'Google Analytics']
  }
];

export default function AgentsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">AI Agents</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage and configure your specialized AI workers.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AGENTS.map((agent) => (
          <div key={agent.id} className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-6 flex flex-col h-full hover:border-[var(--accent-indigo)]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--surface-raised)] flex items-center justify-center text-[var(--accent-indigo)]">
                <agent.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 bg-[var(--surface-base)] px-2 py-1 rounded-full border border-[var(--surface-raised)]">
                <StatusIndicator status={agent.status === 'active' ? 'success' : 'default'} />
                <span className="text-xs font-medium capitalize text-[var(--text-primary)]">{agent.status}</span>
              </div>
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">{agent.name}</h3>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2">{agent.description}</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 bg-[var(--surface-base)] p-3 rounded-md border border-[var(--surface-raised)]">
                <div className="text-center">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Active</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{agent.stats.active_tasks}</div>
                </div>
                <div className="text-center border-l border-[var(--surface-raised)]">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Done Today</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{agent.stats.completed_today}</div>
                </div>
                <div className="text-center border-l border-[var(--surface-raised)]">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Tokens</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{agent.stats.tokens_used}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">Available Tools</div>
                <div className="flex flex-wrap gap-2">
                  {agent.tools.map(tool => (
                    <Badge key={tool} variant="outline" className="bg-[var(--surface-base)] text-[var(--text-primary)] text-xs font-normal">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--surface-raised)] flex gap-2">
                <Button className="w-full bg-[var(--surface-raised)] hover:bg-[var(--surface-raised)]/80 text-[var(--text-primary)]">
                  <Settings className="w-4 h-4 mr-2" /> Configure
                </Button>
                <Button variant="outline" className="px-3 border-[var(--surface-raised)]">
                  <Activity className="w-4 h-4 text-[var(--text-muted)]" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
