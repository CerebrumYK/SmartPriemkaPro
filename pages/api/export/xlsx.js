import * as XLSX from 'xlsx';
import supabase from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  const { data: defects } = await supabase
    .from('defects_full_v2')
    .select('problem,solution,norm_display')
    .in('id', ids);

  const ws = XLSX.utils.json_to_sheet(defects || []);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Defects');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
  res.send(buf);
}
