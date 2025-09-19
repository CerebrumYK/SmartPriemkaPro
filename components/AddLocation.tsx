'use client';

import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

type Category = {
  id: string;
  name: string;
};

export default function AddLocation() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('location_categories')
        .select('id, name')
        .order('name');
      if (error) {
        console.error('Ошибка загрузки категорий:', error.message);
      } else if (data) {
        setCategories(data as Category[]);
      }
    })();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('locations').upsert(
      [
        {
          name,
          category_id: category,
        },
      ],
      { onConflict: 'category_id,name' },
    );

    if (error) {
      setMessage('Ошибка: ' + error.message);
    } else {
      setName('');
      setCategory('');
      setMessage('✅ Локация добавлена (или уже существовала).');
    }
  }

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Добавить локацию</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-2 flex-wrap">
        <input
          type="text"
          placeholder="Название (например: Спальня)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Добавить
        </button>
      </form>
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
