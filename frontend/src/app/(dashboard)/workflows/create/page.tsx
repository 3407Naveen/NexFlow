'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle2, Play, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WorkflowCanvas } from '@/components/workflow/workflow-canvas';

const MOCK_NODES = [
  { id: '1', type: 'trigger-node', position: { x: 250, y: 50 }, data: { label: 'Webhook Received', type: 'trigger', triggerType: 'webhook' } },
  { id: '2', type: 'agent-node', position: { x: 250, y: 150 }, data: { label: 'Extract Data', type: 'agent', agentType: 'worker', status: 'pending' } },
  { id: '3', type: 'approval-node', position: { x: 250, y: 250 }, data: { label: 'Manager Approval', type: 'approval', status: 'pending' } },
  { id: '4', type: 'agent-node', position: { x: 250, y: 350 }, data: { label: 'Update CRM', type: 'agent', agentType: 'worker', status: 'pending' } },
  { id: '5', type: 'end-node', position: { x: 250, y: 450 }, data: { label: 'Success', type: 'end' } },
];

const MOCK_EDGES = [
  { id: 'e1-2', source: '1', target: '2', animated: false },
  { id: 'e2-3', source: '2', target: '3', animated: false },
  { id: 'e3-4', source: '3', target: '4', animated: false },
  { id: 'e4-5', source: '4', target: '5', animated: false },
];

export default function CreateWorkflowPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[var(--surface-base)]">
      <div className="flex items-center justify-between p-4 border-b border-[var(--surface-raised)] bg-[var(--surface-base)] z-10">
        <div className="flex items-center gap-4">
          <Link href="/workflows">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">Create Workflow</h1>
            <p className="text-xs text-[var(--text-muted)]">Design a new automated process</p>
          </div>
        </div>
        
        {step === 2 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setStep(1)} className="border-[var(--surface-raised)]">
              <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
            </Button>
            <Button size="sm" className="bg-[var(--accent-indigo)] text-white hover:opacity-90">
              <Play className="mr-2 h-4 w-4" /> Deploy Workflow
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        {step === 1 ? (
          <div className="h-full flex items-center justify-center p-6">
            <div className="max-w-2xl w-full space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--surface-raised)] text-[var(--accent-indigo)] mb-2">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-semibold text-[var(--text-primary)]">What would you like to automate?</h2>
                <p className="text-[var(--text-muted)]">Describe the business process you want to automate in plain English.</p>
              </div>

              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. When a new invoice is received via email, extract the amount and vendor, require manager approval if it's over $1000, then log it to QuickBooks."
                  className="w-full h-40 p-4 bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-indigo)] resize-none"
                  disabled={isGenerating}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleGenerate} 
                  disabled={!prompt.trim() || isGenerating}
                  className="bg-[var(--accent-indigo)] text-white hover:opacity-90 w-full sm:w-auto"
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Sparkles className="mr-2 h-4 w-4" /> Generate Workflow
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative">
            <div className="absolute top-4 left-4 z-10 bg-[var(--surface-overlay)] p-4 rounded-lg border border-[var(--surface-raised)] shadow-lg max-w-sm">
              <h3 className="font-medium text-[var(--text-primary)] mb-1">Generated Workflow</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{prompt}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-[var(--text-primary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--signal-green)] mr-2" /> 3 AI Agents configured
                </div>
                <div className="flex items-center text-sm text-[var(--text-primary)]">
                  <CheckCircle2 className="h-4 w-4 text-[var(--signal-green)] mr-2" /> 1 Approval checkpoint
                </div>
              </div>
            </div>
            
            <WorkflowCanvas 
              initialNodes={MOCK_NODES} 
              initialEdges={MOCK_EDGES} 
              readOnly={true} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
