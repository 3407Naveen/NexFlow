'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

export interface Column<T> {
  header?: string;
  title?: string;
  accessorKey?: keyof T | string;
  key?: keyof T | string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  emptyState?: React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  isLoading,
  onRowClick,
  emptyState,
  className,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = (a as any)[sortConfig.key];
      const bValue = (b as any)[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  if (isLoading) {
    return (
      <div className={cn('w-full rounded-md border border-border bg-surface-raised', className)}>
        <div className="flex flex-col gap-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 w-full animate-pulse rounded bg-surface-overlay" />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={cn('w-full overflow-auto rounded-md border border-border bg-surface-raised', className)}>
      <table className="w-full text-sm text-left">
        <thead className="bg-surface-overlay text-text-muted">
          <tr>
            {columns.map((col, i) => {
              const headerText = col.header || col.title || '';
              const accessKey = (col.accessorKey || col.key || '') as string;
              return (
                <th 
                  key={i} 
                  className={cn('px-4 py-3 font-medium', col.sortable && 'cursor-pointer hover:text-text-primary')}
                  onClick={() => col.sortable && accessKey && handleSort(accessKey)}
                >
                  <div className="flex items-center gap-1">
                    {headerText}
                    {col.sortable && sortConfig?.key === accessKey && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sortedData.map((item, rowIdx) => (
            <tr
              key={item.id || rowIdx}
              onClick={() => onRowClick?.(item)}
              className={cn(
                'bg-surface-raised transition-colors',
                onRowClick && 'cursor-pointer hover:bg-surface-overlay'
              )}
            >
              {columns.map((col, i) => {
                const accessKey = col.accessorKey || col.key;
                return (
                  <td key={i} className="px-4 py-3 text-text-primary">
                    {col.render ? col.render(item) : accessKey ? (item as any)[accessKey] : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
