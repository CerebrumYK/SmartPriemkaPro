'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';

type Filters = {
  countryId?: string;
  blockId?: string;
  typeId?: string;
  severityId?: number;
  locationCategoryId?: string;
  locationId?: string;
  q?: string;
  page: number;
  pageSize: number;
};

type Ctx = {
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  selectedIds: Set<string>;
  toggleSelected: (id: string) => void;
  clearSelected: () => void;
};

const FiltersCtx = createContext<Ctx | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>({ page: 1, pageSize: 50 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function setFilters(partial: Partial<Filters>) {
    setFiltersState((prev) => ({ ...prev, ...partial, page: 1 }));
  }

  function toggleSelected(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearSelected() {
    setSelectedIds(new Set());
  }

  const value = useMemo(
    () => ({ filters, setFilters, selectedIds, toggleSelected, clearSelected }),
    [filters, selectedIds],
  );

  return <FiltersCtx.Provider value={value}>{children}</FiltersCtx.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersCtx);
  if (!ctx) throw new Error('useFilters must be used inside <FiltersProvider>');
  return ctx;
}
