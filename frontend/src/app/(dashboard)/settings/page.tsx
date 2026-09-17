'use client';

import React, { useState } from 'react';
import { Settings2, Shield, CreditCard, Bot, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'agents' | 'security' | 'billing'>('general');
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-6">Settings</h1>
        <nav className="space-y-1">
          {[
            { id: 'general', label: 'General', icon: Settings2 },
            { id: 'agents', label: 'Agent Defaults', icon: Bot },
            { id: 'security', label: 'Security & API', icon: Shield },
            { id: 'billing', label: 'Billing & Usage', icon: CreditCard },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--surface-overlay)] text-[var(--text-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--surface-raised)] pb-4">General Settings</h2>
            
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">Organization Name</label>
                <input type="text" defaultValue="Acme Corp" className="w-full bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-indigo)]" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">Organization Slug</label>
                <input type="text" defaultValue="acme-corp" readOnly className="w-full bg-[var(--surface-base)]/50 border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-muted)] cursor-not-allowed" />
                <p className="text-xs text-[var(--text-muted)]">Used in URLs and API endpoints. Cannot be changed.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">Default Approval Expiry (Hours)</label>
                <input type="number" defaultValue={24} className="w-full bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-indigo)]" />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[var(--surface-raised)]">
                <div>
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">Demo Mode</h4>
                  <p className="text-xs text-[var(--text-muted)]">Use mock data across the dashboard.</p>
                </div>
                <div className="relative inline-block w-10 h-6 rounded-full bg-[var(--accent-indigo)]">
                  <span className="absolute left-[2px] top-[2px] w-5 h-5 bg-white rounded-full translate-x-4 transition-transform" />
                </div>
              </div>

              <div className="pt-6">
                <Button className="bg-[var(--accent-indigo)] text-white">
                  <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--surface-raised)] pb-4">Security & API Keys</h2>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[var(--text-primary)]">Production API Key</h3>
              <p className="text-sm text-[var(--text-muted)]">Use this key to authenticate with the NexFlow API.</p>
              
              <div className="flex gap-2 max-w-lg">
                <div className="relative flex-1">
                  <input 
                    type={showKey ? 'text' : 'password'} 
                    value="nx_live_8f92j3k4l5m6n7o8p9q0" 
                    readOnly 
                    className="w-full bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md pl-3 pr-10 py-2 text-[var(--text-primary)] font-mono text-sm" 
                  />
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button variant="outline" className="border-[var(--surface-raised)]">Copy</Button>
              </div>
              <Button variant="outline" className="text-[var(--signal-red)] border-[var(--signal-red)] hover:bg-[var(--signal-red)]/10 mt-2">Roll Key</Button>
            </div>

            <div className="mt-8 pt-8 border-t border-[var(--surface-raised)]">
              <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">Role-Based Access Control</h3>
              <div className="bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-[var(--text-primary)]">Manage Roles</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">Configure permissions for team members.</div>
                </div>
                <Button variant="outline" size="sm" className="border-[var(--surface-raised)]">Configure</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--surface-raised)] pb-4">Billing & Usage</h2>
            
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div className="bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-lg p-4">
                <div className="text-sm text-[var(--text-muted)] mb-1">Current Period</div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">$45.20</div>
              </div>
              <div className="bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-lg p-4">
                <div className="text-sm text-[var(--text-muted)] mb-1">Monthly Budget</div>
                <div className="text-2xl font-semibold text-[var(--text-primary)]">$100.00</div>
              </div>
            </div>

            <div className="space-y-2 max-w-lg">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--text-primary)]">Budget Used</span>
                <span className="text-[var(--text-muted)]">45%</span>
              </div>
              <div className="w-full bg-[var(--surface-base)] rounded-full h-2">
                <div className="bg-[var(--accent-indigo)] h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div className="pt-6">
              <Button className="bg-[var(--surface-raised)] text-[var(--text-primary)] hover:bg-[var(--surface-raised)]/80">
                Manage Payment Methods
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--surface-raised)] pb-4">Agent Defaults</h2>
            <p className="text-sm text-[var(--text-muted)]">Global configuration settings applied to all agents unless overridden.</p>
            
            <div className="space-y-4 max-w-md mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--text-primary)]">Default LLM Model</label>
                <select className="w-full bg-[var(--surface-base)] border border-[var(--surface-raised)] rounded-md px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-indigo)]">
                  <option>gpt-4-turbo</option>
                  <option>gpt-4</option>
                  <option>gpt-3.5-turbo</option>
                  <option>claude-3-opus</option>
                </select>
              </div>
              <Button className="bg-[var(--accent-indigo)] text-white mt-4">Save Defaults</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
