'use client';
import { useFilters } from './FiltersContext';

export default function ActionsBar() {
  const { selectedIds, clearSelected, filters } = useFilters();

  async function exportFile(format: 'docx' | 'xlsx') {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) {
      alert('Выберите строки для экспорта.');
      return;
    }

    try {
      const url = `/api/export/${format}?ids=${ids.join(',')}`;
      const a = document.createElement('a');
      a.href = url;
      a.download = `defects_export_${Date.now()}.${format}`;
      a.click();
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      alert('Произошла ошибка при экспорте. Попробуйте снова.');
    }
  }

  function exportAllByFilters(format: 'docx' | 'xlsx') {
    // TODO: Реализовать экспорт всех по фильтрам в следующей версии
    alert('Функция экспорта всех данных по фильтрам будет добавлена в следующей версии.');
  }

  function resetFilters() {
    // Сброс всех фильтров кроме page и pageSize
    const { page, pageSize } = filters;
    window.location.search = '';
  }

  const hasFilters =
    filters.countryId || filters.blockId || filters.typeId || filters.severityId || filters.q;
  const selectedCount = selectedIds.size;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Экспорт выбранных */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {selectedCount > 0 ? `Выбрано: ${selectedCount}` : 'Экспорт выбранных:'}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportFile('docx')}
              disabled={selectedCount === 0}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-supreme-primary hover:bg-supreme-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              DOCX
            </button>
            <button
              onClick={() => exportFile('xlsx')}
              disabled={selectedCount === 0}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-status-minor hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              XLSX
            </button>
          </div>
        </div>

        {/* Экспорт всех по фильтрам */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Экспорт всех по фильтрам:
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => exportAllByFilters('docx')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              DOCX (все)
            </button>
            <button
              onClick={() => exportAllByFilters('xlsx')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              XLSX (все)
            </button>
          </div>
        </div>

        {/* Управление */}
        <div className="flex gap-2">
          <button
            onClick={clearSelected}
            disabled={selectedCount === 0}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Очистить выбор
          </button>
          <button
            onClick={resetFilters}
            disabled={!hasFilters}
            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
}
