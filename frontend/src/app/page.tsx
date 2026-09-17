'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Bot,
  GitBranch,
  ShieldCheck,
  Zap,
  BarChart3,
  Lock,
  CheckCircle2,
  ChevronRight,
  Play,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Bot,
    title: 'Specialized AI Agents',
    description:
      'Five domain-specific agents for Sales, Finance, HR, Support, and Marketing — each with dedicated tools and expertise.',
  },
  {
    icon: GitBranch,
    title: 'Visual Workflow Engine',
    description:
      'Describe a process in plain English and watch it become an executable workflow. Edit, version, and monitor in real time.',
  },
  {
    icon: ShieldCheck,
    title: 'Human-in-the-Loop Approvals',
    description:
      'High-risk actions pause for human review. Approve, reject, or request changes before agents proceed.',
  },
  {
    icon: Zap,
    title: 'Automated Verification',
    description:
      'Every agent output is independently verified before delivery. No hallucinated results reach your business.',
  },
  {
    icon: BarChart3,
    title: 'Full Observability',
    description:
      'Track every decision, tool call, and token spent. Complete audit trail for compliance and debugging.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description:
      'Organization isolation, role-based access, encrypted credentials, and prompt injection defense built in.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Describe Your Process',
    description: 'Tell NexFlow what you need in plain language. "Follow up with all inactive leads from the last 30 days."',
  },
  {
    step: '02',
    title: 'Review the Plan',
    description: 'The Orchestrator breaks your request into tasks, assigns agents, and shows you the workflow before execution.',
  },
  {
    step: '03',
    title: 'Agents Execute',
    description: 'Specialized agents run each task using real tools — searching CRM, drafting emails, generating invoices.',
  },
  {
    step: '04',
    title: 'Verify & Approve',
    description: 'A Verification agent checks every output. High-risk actions pause for your approval. You stay in control.',
  },
];

const WORKFLOW_NODES = [
  { id: 1, label: 'Parse Request', agent: 'Orchestrator', status: 'completed' as const, x: 50, y: 0 },
  { id: 2, label: 'Search Inactive Leads', agent: 'Sales & CRM', status: 'completed' as const, x: 30, y: 1 },
  { id: 3, label: 'Draft Follow-up Emails', agent: 'Marketing', status: 'running' as const, x: 70, y: 1 },
  { id: 4, label: 'Verify Email Content', agent: 'Verification', status: 'pending' as const, x: 50, y: 2 },
  { id: 5, label: 'Manager Approval', agent: 'Approval Gate', status: 'pending' as const, x: 50, y: 3 },
  { id: 6, label: 'Send Emails', agent: 'Sales & CRM', status: 'pending' as const, x: 50, y: 4 },
];

function StatusDot({ status }: { status: 'completed' | 'running' | 'pending' }) {
  const colors = {
    completed: 'bg-[#3FBF7F]',
    running: 'bg-[#5B6EF5] animate-pulse',
    pending: 'bg-[#8B90A0]/40',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
}

export default function LandingPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#0E1016] text-[#EDEEF2]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#2A2D3A]/50 bg-[#0E1016]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#5B6EF5] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">NexFlow</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#8B90A0]">
            <a href="#features" className="hover:text-[#EDEEF2] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#EDEEF2] transition-colors">How It Works</a>
            <a href="#security" className="hover:text-[#EDEEF2] transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[#8B90A0] hover:text-[#EDEEF2] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#5B6EF5] hover:bg-[#6E7FF7] text-white rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#5B6EF5]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5B6EF5]/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2A2D3A] bg-[#171A22] text-xs text-[#8B90A0] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3FBF7F] animate-pulse" />
                AI-Powered Process Automation
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                Where AI Agents{' '}
                <span className="text-[#5B6EF5]">Run Your Business</span>
              </h1>
              <p className="text-lg text-[#8B90A0] leading-relaxed mb-8 max-w-lg">
                Describe a business process in plain English. NexFlow&apos;s AI agents plan,
                execute, verify, and deliver — with humans approving what matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-[#5B6EF5] hover:bg-[#6E7FF7] text-white rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Try the Demo
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium border border-[#2A2D3A] hover:border-[#3A3D4A] text-[#EDEEF2] rounded-lg transition-colors"
                >
                  See How It Works
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Live Workflow Visualization */}
            <div className="relative">
              <div className="bg-[#171A22] border border-[#2A2D3A] rounded-xl p-6 shadow-2xl shadow-black/20">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#2A2D3A]">
                  <div className="w-3 h-3 rounded-full bg-[#E2555A]" />
                  <div className="w-3 h-3 rounded-full bg-[#E8A33D]" />
                  <div className="w-3 h-3 rounded-full bg-[#3FBF7F]" />
                  <span className="ml-3 text-xs text-[#8B90A0] font-mono">
                    workflow: follow-up-inactive-leads
                  </span>
                </div>
                <div className="space-y-3">
                  {WORKFLOW_NODES.map((node) => (
                    <div
                      key={node.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                        node.status === 'running'
                          ? 'border-[#5B6EF5]/50 bg-[#5B6EF5]/5'
                          : node.status === 'completed'
                          ? 'border-[#3FBF7F]/20 bg-[#3FBF7F]/5'
                          : 'border-[#2A2D3A] bg-[#1F2330]/50'
                      }`}
                    >
                      <StatusDot status={node.status} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{node.label}</div>
                        <div className="text-xs text-[#8B90A0]">{node.agent}</div>
                      </div>
                      {node.status === 'completed' && (
                        <CheckCircle2 className="w-4 h-4 text-[#3FBF7F] flex-shrink-0" />
                      )}
                      {node.status === 'running' && (
                        <div className="text-xs text-[#5B6EF5] font-mono flex-shrink-0">
                          executing...
                        </div>
                      )}
                      {node.id === 5 && (
                        <span className="text-xs px-2 py-0.5 rounded bg-[#E8A33D]/10 text-[#E8A33D] flex-shrink-0">
                          Requires Approval
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything you need to automate with confidence
            </h2>
            <p className="text-[#8B90A0] text-lg max-w-2xl mx-auto">
              Not a chatbot. Not a no-code builder. A runtime where AI agents do real work
              and humans keep control.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group p-6 rounded-xl border border-[#2A2D3A] bg-[#171A22] hover:border-[#3A3D4A] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#5B6EF5]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#5B6EF5]" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#8B90A0] leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-[#171A22]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              From description to execution in four steps
            </h2>
            <p className="text-[#8B90A0] text-lg max-w-2xl mx-auto">
              No templates, no drag-and-drop configuration. Just tell NexFlow what you need.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                {index < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%+8px)] w-[calc(100%-48px)] h-px bg-gradient-to-r from-[#2A2D3A] to-transparent" />
                )}
                <div className="text-3xl font-bold text-[#5B6EF5]/20 mb-3 font-mono">
                  {step.step}
                </div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[#8B90A0] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Built for trust, not theater
          </h2>
          <p className="text-[#8B90A0] text-lg max-w-2xl mx-auto mb-12">
            Every feature answers one question: does this help the user trust and control a
            workflow that agents run for them?
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="p-5 rounded-xl border border-[#2A2D3A] bg-[#171A22]">
              <div className="text-[#E8A33D] text-sm font-medium mb-1">Amber = You</div>
              <p className="text-xs text-[#8B90A0]">
                One reserved color across the entire product marks where a human decision is
                needed. Nothing else uses it.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#2A2D3A] bg-[#171A22]">
              <div className="text-[#3FBF7F] text-sm font-medium mb-1">Verified Outputs</div>
              <p className="text-xs text-[#8B90A0]">
                A dedicated Verification agent scores every output PASS/FAIL/NEEDS_REVIEW
                before it reaches you.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[#2A2D3A] bg-[#171A22]">
              <div className="text-[#5B6EF5] text-sm font-medium mb-1">Complete Audit Trail</div>
              <p className="text-xs text-[#8B90A0]">
                Immutable, append-only audit log records every action, decision, and data
                access across your organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to let agents handle the busywork?
          </h2>
          <p className="text-[#8B90A0] text-lg mb-8">
            Start with the demo — no API keys required. See a real workflow run end to end.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium bg-[#5B6EF5] hover:bg-[#6E7FF7] text-white rounded-xl transition-colors shadow-lg shadow-[#5B6EF5]/20"
          >
            Launch NexFlow Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2D3A] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#5B6EF5] flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium">NexFlow</span>
          </div>
          <p className="text-xs text-[#8B90A0]">
            &copy; {new Date().getFullYear()} NexFlow. Where AI Agents Run Your Business.
          </p>
        </div>
      </footer>
    </div>
  );
}
