'use client';

import { useEffect, useState } from 'react';
import supabase from '../../../lib/supabaseClient';
import Gallery from '../../../components/Gallery';
import Measurements from '../../../components/Measurements';
import AuthButton from '../../../components/AuthButton';
import AddLocation from '../../../components/AddLocation';

type Defect = {
  id: string;
  country_name: string;
  block_name: string;
  type_name: string;
  problem: string;
  description: string | null;
  solution: string | null;
  norm_display: string | null;
  norm_source_url: string | null;
  severity_name: string | null;
  location_category_name: string | null;
  location_name: string | null;
};

export default function DefectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [row, setRow] = useState<Defect | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('defects_full_v2')
        .select('*')
        .eq('id', id)
        .single();
      if (!error) setRow(data as Defect);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <main className="p-4">Загрузка…</main>;
  if (!row) return <main className="p-4">Дефект не найден</main>;

  return (
    <main className="p-4 space-y-4">
      <a href="/" className="text-blue-600 underline text-sm">
        ← Назад к списку
      </a>

      <AuthButton />

      <h1 className="text-2xl font-bold">Дефект: {row.problem}</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Карточка с данными дефекта */}
        <div className="border rounded p-4 space-y-2">
          <div>
            <span className="font-semibold">Страна:</span> {row.country_name}
          </div>
          <div>
            <span className="font-semibold">Блок / Тип:</span> {row.block_name} / {row.type_name}
          </div>
          <div>
            <span className="font-semibold">Локация:</span> {row.location_category_name}{' '}
            {row.location_name ? `→ ${row.location_name}` : ''}
          </div>
          <div>
            <span className="font-semibold">Критичность:</span> {row.severity_name || '—'}
          </div>
          <div>
            <span className="font-semibold">Описание:</span> {row.description || '—'}
          </div>
          <div>
            <span className="font-semibold">Решение:</span> {row.solution || '—'}
          </div>
          <div>
            <span className="font-semibold">Норма:</span>{' '}
            {row.norm_display ? (
              row.norm_source_url ? (
                <a
                  className="text-blue-600 underline"
                  href={row.norm_source_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {row.norm_display}
                </a>
              ) : (
                row.norm_display
              )
            ) : (
              '—'
            )}
          </div>
        </div>

        {/* Галерея фото */}
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-2">Галерея</h2>
          <Gallery defectId={row.id} />
        </div>
      </div>

      {/* Измерения */}
      <Measurements defectId={row.id} />

      {/* Добавить локацию */}
      <AddLocation />
    </main>
  );
}
