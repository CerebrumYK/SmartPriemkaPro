'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import supabase from '../lib/supabaseClient';
import { useFilters } from './FiltersContext';

type Opt = { id: string; name: string };
type Sev = { id: number; name: string };

export default function FiltersBar() {
  const { filters, setFilters } = useFilters();
  const [countries, setCountries] = useState<Opt[]>([]);
  const [blocks, setBlocks] = useState<Opt[]>([]);
  const [types, setTypes] = useState<Opt[]>([]);
  const [severities, setSeverities] = useState<Sev[]>([]);
  const [locationCategories, setLocationCategories] = useState<Opt[]>([]);
  const [locations, setLocations] = useState<Opt[]>([]);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: c, error: cError } = await supabase
          .from('countries')
          .select('id,name')
          .eq('is_enabled', true);
        const { data: b, error: bError } = await supabase.from('blocks').select('id,name');
        const { data: s, error: sError } = await supabase
          .from('severity_levels')
          .select('id,name')
          .order('sort_order');
        const { data: lc, error: lcError } = await supabase
          .from('location_categories')
          .select('id,name');

        if (cError) console.error('Error fetching countries:', cError);
        if (bError) console.error('Error fetching blocks:', bError);
        if (sError) console.error('Error fetching severities:', sError);
        if (lcError) console.error('Error fetching location categories:', lcError);

        setCountries(c || []);
        setBlocks(b || []);
        setSeverities(s || []);
        setLocationCategories(lc || []);
      } catch (error) {
        console.error('Unexpected error loading filters:', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!filters.blockId) {
          setTypes([]);
          return;
        }
        const { data: t, error } = await supabase
          .from('defect_types')
          .select('id,name')
          .eq('block_id', filters.blockId);

        if (error) {
          console.error('Error fetching types:', error);
          setTypes([]);
          return;
        }

        setTypes(t || []);
      } catch (error) {
        console.error('Unexpected error loading types:', error);
        setTypes([]);
      }
    })();
  }, [filters.blockId]);

  useEffect(() => {
    (async () => {
      try {
        if (!filters.locationCategoryId) {
          setLocations([]);
          return;
        }
        const { data: l, error } = await supabase
          .from('locations')
          .select('id,name')
          .eq('category_id', filters.locationCategoryId);

        if (error) {
          console.error('Error fetching locations:', error);
          setLocations([]);
          return;
        }

        setLocations(l || []);
      } catch (error) {
        console.error('Unexpected error loading locations:', error);
        setLocations([]);
      }
    })();
  }, [filters.locationCategoryId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Фильтры</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Страна */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.countryId || ''}
          onChange={(e) => setFilters({ countryId: e.target.value || undefined })}
          aria-label="Выбор страны"
        >
          <option value="">Страна</option>
          {countries.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* Блок */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.blockId || ''}
          onChange={(e) => setFilters({ blockId: e.target.value || undefined, typeId: undefined })}
          aria-label="Выбор блока"
        >
          <option value="">Блок</option>
          {blocks.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* Тип */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.typeId || ''}
          onChange={(e) => setFilters({ typeId: e.target.value || undefined })}
          disabled={!filters.blockId}
          aria-label="Выбор типа дефекта"
        >
          <option value="">Тип</option>
          {types.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* Категория локации */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.locationCategoryId || ''}
          onChange={(e) =>
            setFilters({ locationCategoryId: e.target.value || undefined, locationId: undefined })
          }
          aria-label="Выбор категории локации"
        >
          <option value="">Категория локации</option>
          {locationCategories.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* Локация */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.locationId || ''}
          onChange={(e) => setFilters({ locationId: e.target.value || undefined })}
          disabled={!filters.locationCategoryId}
          aria-label="Выбор локации"
        >
          <option value="">Локация</option>
          {locations.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        {/* Критичность */}
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
          value={filters.severityId || ''}
          onChange={(e) =>
            setFilters({ severityId: e.target.value ? Number(e.target.value) : undefined })
          }
          aria-label="Выбор уровня критичности"
        >
          <option value="">Критичность</option>
          {severities.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Поиск */}
      <div className="mt-4">
        <input
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          placeholder="Поиск по проблемам, описанию и нормам..."
          value={filters.q || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/[,()]/g, ' '); // Sanitize search input
            if (searchTimeoutRef.current) {
              clearTimeout(searchTimeoutRef.current);
            }
            searchTimeoutRef.current = setTimeout(() => {
              setFilters({ q: value.trim() || undefined });
            }, 300);
          }}
          aria-label="Поиск по проблемам, описанию и нормам"
        />
      </div>
    </div>
  );
}
