'use client';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

type MediaFile = {
  id: string;
  path: string;
  tags: string[] | null;
};

export default function Gallery({ defectId }: { defectId: string }) {
  const [photos, setPhotos] = useState<{ url: string; tags: string[] }[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { data: media, error } = await supabase
        .from('media_files')
        .select('id, path, tags')
        .eq('defect_id', defectId);

      if (error) {
        console.error('Ошибка загрузки media_files:', error.message);
        return;
      }

      if (!media) return;

      const signedPhotos: { url: string; tags: string[] }[] = [];

      for (const m of media as MediaFile[]) {
        const { data: signed, error: signError } = await supabase.storage
          .from('media')
          .createSignedUrl(m.path, 300);

        if (!signError && signed?.signedUrl) {
          signedPhotos.push({
            url: signed.signedUrl,
            tags: m.tags || [],
          });
        }
      }

      setPhotos(signedPhotos);
    })();
  }, [defectId]);

  const filtered = filter
    ? photos.filter((p) => p.tags.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())))
    : photos;

  return (
    <div>
      <div className="mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Фильтр по тегам..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {filtered.length === 0 && <p>Фото не найдены</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p, i) => (
          <div key={i} className="border rounded p-2 shadow-sm">
            <img src={p.url} alt={`Фото ${i}`} className="w-full h-40 object-cover rounded" />
            {p.tags.length > 0 && (
              <div className="mt-1 text-xs text-gray-500">Теги: {p.tags.join(', ')}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
