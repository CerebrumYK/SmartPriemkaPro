'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../lib/supabaseClient';
import { useFilters } from './FiltersContext';

type Row = {
  id: string;
  problem: string;
  description: string | null;
  solution: string | null;
  norm_display: string | null;
  severity_order: number | null;
  severity_name: string | null;
  country_name: string;
  block_name: string;
  type_name: string;
  location_category_name: string | null;
  location_name: string | null;
};

export default function DefectsTable() {
  const { filters, setFilters, selectedIds, toggleSelected } = useFilters();
  const [rows, setRows] = useState<Row[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    page,
    pageSize,
    countryId,
    blockId,
    typeId,
    severityId,
    locationCategoryId,
    locationId,
    q,
  } = filters;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let query = supabase.from('defects_view_v2').select('*', { count: 'exact' });

        if (countryId) query = query.eq('country_id', countryId);
        if (blockId) query = query.eq('block_id', blockId);
        if (typeId) query = query.eq('type_id', typeId);
        if (severityId) query = query.eq('severity_id', severityId);
        // TODO: добавить фильтры по локации когда поля будут в представлении
        // if (locationCategoryId) query = query.eq("location_category_id", locationCategoryId);
        // if (locationId) query = query.eq("location_id", locationId);
        if (q)
          query = query.or(
            `problem.ilike.%${q}%,description.ilike.%${q}%,solution.ilike.%${q}%,norm_display.ilike.%${q}%`,
          );

        query = query.order('severity_order', { ascending: true });

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        const { data, count, error } = await query.range(from, to);

        if (error) {
          console.error('Error fetching defects:', error);
          setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
          setRows([]);
          setTotal(0);
          return;
        }

        setError(null);
        setRows((data as Row[]) || []);
        setTotal(count || 0);
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('Произошла непредвиденная ошибка. Попробуйте обновить страницу.');
        setRows([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    })();
  }, [page, pageSize, countryId, blockId, typeId, severityId, q]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const getSeverityColor = (severityName: string | null) => {
    switch (severityName?.toLowerCase()) {
      case 'критично':
        return 'bg-status-critical text-white';
      case 'существенно':
        return 'bg-status-important text-white';
      case 'незначительно':
        return 'bg-status-minor text-white';
      case 'информативно':
        return 'bg-status-info text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
              >
                Обновить
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-supreme-primary"></div>
          <span className="ml-2 text-gray-600">Загрузка...</span>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-supreme-primary focus:ring-supreme-primary"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Страна
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Блок
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Проблема
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Описание
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Решение
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Норма
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Критичность
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Локация
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(r.id)}
                    onChange={() => toggleSelected(r.id)}
                    className="rounded border-gray-300 text-supreme-primary focus:ring-supreme-primary"
                    aria-label={`Выбрать строку: ${r.problem}`}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.country_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {r.block_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{r.type_name}</td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/defect/${r.id}`}
                    className="text-supreme-primary hover:text-supreme-secondary font-medium transition-colors"
                  >
                    {r.problem}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {r.description || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {r.solution || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{r.norm_display || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(r.severity_name)}`}
                  >
                    {r.severity_name || 'Не указано'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {r.location_category_name && r.location_name
                    ? `${r.location_category_name} / ${r.location_name}`
                    : r.location_category_name || r.location_name || '—'}
                </td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr>
                <td className="px-6 py-12 text-center text-gray-500" colSpan={10}>
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-12 w-12 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium">Нет данных</p>
                    <p className="text-sm">Попробуйте изменить фильтры</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Пагинация */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Показано {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} из {total}{' '}
              записей
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => setFilters({ pageSize: Number(e.target.value) })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-supreme-primary focus:border-supreme-primary"
              aria-label="Количество записей на странице"
            >
              <option value={50}>50 на стр.</option>
              <option value={100}>100 на стр.</option>
              <option value={200}>200 на стр.</option>
            </select>

            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Пагинация"
            >
              <button
                disabled={page <= 1}
                onClick={() => setFilters({ page: 1 })}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Первая страница"
              >
                ««
              </button>
              <button
                disabled={page <= 1}
                onClick={() => setFilters({ page: page - 1 })}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Предыдущая страница"
              >
                ‹
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setFilters({ page: page + 1 })}
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Следующая страница"
              >
                ›
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setFilters({ page: totalPages })}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Последняя страница"
              >
                »»
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
