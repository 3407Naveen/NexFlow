'use client';

import React, { useState } from 'react';
import { Book, Plus, Search, FileText, Globe, Database, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';

const MOCK_KNOWLEDGE = [
  {
    id: 'kb-1',
    name: 'Employee Handbook 2023',
    source_type: 'document',
    chunk_count: 245,
    status: 'ready',
    created_at: '2023-10-01T10:00:00Z'
  },
  {
    id: 'kb-2',
    name: 'Help Center Docs',
    source_type: 'webpage',
    chunk_count: 1890,
    status: 'ready',
    created_at: '2023-10-05T14:30:00Z'
  },
  {
    id: 'kb-3',
    name: 'Product Database Specs',
    source_type: 'database',
    chunk_count: 56,
    status: 'processing',
    created_at: '2023-10-20T09:15:00Z'
  }
];

export default function KnowledgePage() {
  const [search, setSearch] = useState('');

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'webpage': return <Globe className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Knowledge Base</h1>
          <p className="text-[var(--text-muted)] mt-1">Upload documents to teach your agents about your business.</p>
        </div>
        <Button className="bg-[var(--accent-indigo)] text-white hover:opacity-90">
          <Plus className="mr-2 h-4 w-4" />
          Add Knowledge
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
        <input 
          type="text" 
          placeholder="Semantic search across all knowledge bases..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-md pl-10 pr-4 py-2 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-indigo)]"
        />
      </div>

      {MOCK_KNOWLEDGE.length === 0 ? (
        <EmptyState
          icon={<Book className="h-12 w-12 text-[var(--text-muted)]" />}
          title="No knowledge bases yet"
          description="Upload documents to teach your agents"
          action={
            <Button className="bg-[var(--accent-indigo)] text-white mt-4">
              Add Knowledge
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_KNOWLEDGE.map((kb) => (
            <div key={kb.id} className="bg-[var(--surface-overlay)] border border-[var(--surface-raised)] rounded-lg p-5 flex flex-col hover:border-[var(--surface-raised)] transition-colors">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="outline" className="flex items-center gap-1.5 bg-[var(--surface-base)] text-[var(--text-primary)]">
                  {getSourceIcon(kb.source_type)}
                  <span className="capitalize">{kb.source_type}</span>
                </Badge>
                <div className="flex items-center gap-2">
                  {kb.status === 'processing' && (
                    <Badge className="bg-[var(--signal-amber)]/20 text-[var(--signal-amber)] border-none">Processing</Badge>
                  )}
                  {kb.status === 'ready' && (
                    <Badge className="bg-[var(--signal-green)]/20 text-[var(--signal-green)] border-none">Ready</Badge>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">{kb.name}</h3>
              
              <div className="mt-auto pt-6 flex items-center justify-between">
                <div className="text-sm text-[var(--text-muted)]">
                  {kb.chunk_count} chunks • {new Date(kb.created_at).toLocaleDateString()}
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[var(--text-muted)] hover:text-[var(--signal-red)]">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
