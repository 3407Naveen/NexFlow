'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  GitBranch,
  Bot,
  ListChecks,
  ShieldCheck,
  BookOpen,
  Plug,
  BarChart3,
  ScrollText,
  Settings,
  Hexagon
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Workflows', href: '/workflows', icon: GitBranch },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Tasks', href: '/tasks', icon: ListChecks },
  { name: 'Approvals', href: '/approvals', icon: ShieldCheck, badge: 3 },
  { name: 'Knowledge', href: '/knowledge', icon: BookOpen },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Audit Log', href: '/audit', icon: ScrollText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-surface-base">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="h-6 w-6 text-accent-indigo" fill="currentColor" />
          <span className="text-lg font-bold text-text-primary tracking-tight">NexFlow</span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = Boolean(pathname && (pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent-indigo-muted text-accent-indigo'
                    : 'text-text-muted hover:bg-surface-raised hover:text-text-primary'
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isActive ? 'text-accent-indigo' : 'text-text-muted group-hover:text-text-primary'
                    )}
                  />
                  {item.name}
                </div>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-signal-amber text-[10px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-overlay text-sm font-medium text-text-primary">
            NS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-primary">Naveen S</span>
            <span className="text-xs text-text-muted">Acme Corp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
