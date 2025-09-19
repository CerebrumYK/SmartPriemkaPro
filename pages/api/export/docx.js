import { Document, Packer, Paragraph, Table, TableRow, TableCell } from 'docx';
import supabase from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  const { data: defects } = await supabase
    .from('defects_full_v2')
    .select('problem,solution,norm_display')
    .in('id', ids);

  const rows = (defects || []).map(
    (d) =>
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(d.problem)] }),
          new TableCell({ children: [new Paragraph(d.solution || '')] }),
          new TableCell({ children: [new Paragraph(d.norm_display || '')] }),
        ],
      }),
  );

  const doc = new Document({
    sections: [{ children: [new Paragraph('Отчёт по приёмке'), new Table({ rows })] }],
  });

  const buffer = await Packer.toBuffer(doc);
  res.setHeader('Content-Disposition', 'attachment; filename=report.docx');
  res.send(buffer);
}
