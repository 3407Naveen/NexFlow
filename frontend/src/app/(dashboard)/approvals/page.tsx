'use client';

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Clock, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { Approval } from '@/types';

const MOCK_APPROVALS: Approval[] = [
  {
    id: 'app-1',
    task_id: 'task-1',
    status: 'pending',
    risk_level: 'high',
    requested_at: new Date(Date.now() - 3600000).toISOString(),
    responded_at: null,
    responder_id: null,
    reason: null,
    context: {
      workflow_name: 'Vendor Payment',
      amount: '$15,400.00',
      vendor: 'Acme Corp',
      agent: 'Finance Coordinator'
    }
  },
  {
    id: 'app-2',
    task_id: 'task-2',
    status: 'pending',
    risk_level: 'medium',
    requested_at: new Date(Date.now() - 7200000).toISOString(),
    responded_at: null,
    responder_id: null,
    reason: null,
    context: {
      workflow_name: 'Customer Refund',
      amount: '$150.00',
      customer_id: 'CUS-892',
      agent: 'Support Worker'
    }
  },
  {
    id: 'app-3',
    task_id: 'task-3',
    status: 'approved',
    risk_level: 'low',
    requested_at: new Date(Date.now() - 86400000).toISOString(),
    responded_at: new Date(Date.now() - 80000000).toISOString(),
    responder_id: 'user-1',
    reason: 'Looks good',
    context: {
      workflow_name: 'Content Publishing',
      title: 'Q3 Newsletter',
      agent: 'Marketing Worker'
    }
  }
];

export default function ApprovalsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const filteredApprovals = MOCK_APPROVALS.filter(a => a.status === activeTab);
  const pendingCount = MOCK_APPROVALS.filter(a => a.status === 'pending').length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Approval Center</h1>
          {pendingCount > 0 && (
            <Badge className="bg-[var(--signal-amber)] text-black font-semibold">
              {pendingCount} Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6 border-b border-[var(--surface-raised)] pb-2">
        {(['pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize pb-2 px-1 border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-[var(--accent-indigo)] text-[var(--text-primary)]'
                : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredApprovals.length === 0 ? (
        <div className="pt-10">
          <EmptyState
            icon={<ShieldCheck className="h-12 w-12 text-[var(--signal-green)]" />}
            title={activeTab === 'pending' ? "All clear" : `No ${activeTab} items`}
            description={activeTab === 'pending' ? "No approvals pending your review" : ""}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApprovals.map((approval) => {
            const isOverdue = new Date(approval.requested_at).getTime() < Date.now() - 4 * 3600000;
            return (
              <div 
                key={approval.id}
                className={`bg-[var(--surface-overlay)] border rounded-lg p-5 flex flex-col ${
                  isOverdue && approval.status === 'pending' ? 'border-[var(--signal-amber)]' : 'border-[var(--surface-raised)]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className={`
                    ${approval.risk_level === 'high' ? 'border-[var(--signal-red)] text-[var(--signal-red)]' : ''}
                    ${approval.risk_level === 'medium' ? 'border-[var(--signal-amber)] text-[var(--signal-amber)]' : ''}
                    ${approval.risk_level === 'low' ? 'border-[var(--signal-green)] text-[var(--signal-green)]' : ''}
                  `}>
                    {approval.risk_level} risk
                  </Badge>
                  {approval.status === 'pending' && (
                    <div className="flex items-center text-xs text-[var(--text-muted)]">
                      <Clock className="w-3 h-3 mr-1" />
                      {isOverdue ? <span className="text-[var(--signal-amber)]">Overdue</span> : 'Expires in 18h'}
                    </div>
                  )}
                </div>

                <div className="mb-4 flex-1">
                  <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">
                    {approval.context.workflow_name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">
                    Requested by {approval.context.agent}
                  </p>
                  
                  <div className="bg-[var(--surface-base)] rounded p-3 text-sm font-mono space-y-2 border border-[var(--surface-raised)]">
                    {Object.entries(approval.context).map(([key, value]) => {
                      if (key === 'workflow_name' || key === 'agent') return null;
                      return (
                        <div key={key} className="flex justify-between">
                          <span className="text-[var(--text-muted)] capitalize">{key.replace('_', ' ')}:</span>
                          <span className="text-[var(--text-primary)]">{String(value)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {approval.status === 'pending' && (
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-[var(--surface-raised)]">
                    <Button variant="outline" className="w-full border-[var(--signal-red)] text-[var(--signal-red)] hover:bg-[var(--signal-red)]/10">
                      <X className="w-4 h-4 mr-2" /> Reject
                    </Button>
                    <Button className="w-full bg-[var(--signal-green)] text-black hover:opacity-90 font-medium">
                      <Check className="w-4 h-4 mr-2" /> Approve
                    </Button>
                  </div>
                )}
                
                {approval.status !== 'pending' && (
                  <div className="mt-auto pt-4 border-t border-[var(--surface-raised)] text-sm text-[var(--text-muted)]">
                    {approval.status === 'approved' ? 'Approved' : 'Rejected'} on {new Date(approval.responded_at || '').toLocaleDateString()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
