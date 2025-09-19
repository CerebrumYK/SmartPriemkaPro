'use client';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient';

type Measurement = {
  id: number;
  name: string;
  value: string | null;
  unit: string | null;
  created_at: string;
};

export default function Measurements({ defectId }: { defectId: string }) {
  const [list, setList] = useState<Measurement[]>([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from('defect_measurements')
      .select('*')
      .eq('defect_id', defectId)
      .order('created_at', { ascending: false });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setList(data as Measurement[]);
    }
  }

  async function addMeasurement(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase
      .from('defect_measurements')
      .insert([{ defect_id: defectId, name, value, unit }]);

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setName('');
      setValue('');
      setUnit('');
      await load();
    }
  }

  useEffect(() => {
    load();
  }, [defectId]);

  return (
    <div className="border rounded p-4">
      <h2 className="font-semibold mb-2">Измерения</h2>
      {errorMsg && <p className="text-red-600">{errorMsg}</p>}

      <form onSubmit={addMeasurement} className="flex gap-2 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Параметр"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Значение"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Единица"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Добавить
        </button>
      </form>

      <table className="border-collapse border w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2">Параметр</th>
            <th className="border p-2">Значение</th>
            <th className="border p-2">Ед.</th>
            <th className="border p-2">Дата</th>
          </tr>
        </thead>
        <tbody>
          {list.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.name}</td>
              <td className="border p-2">{m.value || ''}</td>
              <td className="border p-2">{m.unit || ''}</td>
              <td className="border p-2">{new Date(m.created_at).toLocaleString('ru-RU')}</td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr>
              <td colSpan={4} className="border p-2 text-center">
                Нет измерений
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
