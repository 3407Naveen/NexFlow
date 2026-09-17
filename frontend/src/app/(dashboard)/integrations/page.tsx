import React from 'react';
import { Blocks, Plus, CheckCircle2, Link2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const INTEGRATIONS = [
  {
    category: 'Communication',
    items: [
      { id: 'gmail', name: 'Gmail', status: 'connected', provider: 'google' },
      { id: 'slack', name: 'Slack', status: 'disconnected', provider: 'slack' }
    ]
  },
  {
    category: 'CRM & Sales',
    items: [
      { id: 'hubspot', name: 'HubSpot', status: 'connected', provider: 'hubspot' },
      { id: 'salesforce', name: 'Salesforce', status: 'disconnected', provider: 'salesforce' }
    ]
  },
  {
    category: 'Finance & Billing',
    items: [
      { id: 'stripe', name: 'Stripe', status: 'disconnected', provider: 'stripe' },
      { id: 'quickbooks', name: 'QuickBooks', status: 'disconnected', provider: 'quickbooks' }
    ]
  },
  {
    category: 'Storage',
    items: [
      { id: 'gdrive', name: 'Google Drive', status: 'disconnected', provider: 'google' },
      { id: 'dropbox', name: 'Dropbox', status: 'disconnected', provider: 'dropbox' }
    ]
  }
];

export default function IntegrationsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Integrations</h1>
          <p className="text-[var(--text-muted)] mt-1">Connect your tools to give agents access to external systems.</p>
        </div>
        <Button className="bg-[var(--accent-indigo)] text-white hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Connect Integration
        </Button>
      </div>

      <div className="space-y-8">
        {INTEGRATIONS.map((section) => (
          <div key={section.category} className="space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--surface-raised)] pb-2">
              {section.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <div key={item.id} className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-5 flex items-center justify-between hover:border-[var(--surface-raised)]/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-md bg-[var(--surface-base)] border border-[var(--surface-raised)] flex items-center justify-center text-[var(--text-muted)]">
                      {/* Logo placeholder */}
                      <Blocks className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[var(--text-primary)]">{item.name}</h3>
                      {item.status === 'connected' ? (
                        <div className="flex items-center text-xs text-[var(--signal-green)] mt-1">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                        </div>
                      ) : (
                        <div className="text-xs text-[var(--text-muted)] mt-1">Not connected</div>
                      )}
                    </div>
                  </div>
                  
                  {item.status === 'connected' ? (
                    <Button variant="outline" size="sm" className="border-[var(--surface-raised)] text-[var(--text-primary)] h-8">
                      Manage
                    </Button>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-[var(--accent-indigo)] hover:text-[var(--accent-indigo)] hover:bg-[var(--accent-indigo)]/10 h-8">
                      <Link2 className="w-4 h-4 mr-1.5" /> Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-lg p-6 text-center mt-12">
        <h3 className="text-[var(--text-primary)] font-medium mb-2">Need an integration not listed here?</h3>
        <p className="text-sm text-[var(--text-muted)] mb-4">You can build custom tools using webhooks or our API.</p>
        <Button variant="outline" className="border-[var(--surface-raised)]">
          View API Docs <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
