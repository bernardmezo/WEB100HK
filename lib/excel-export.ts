import ExcelJS from 'exceljs';
import { Activity } from './types';
import { calculateScore, getPredicate } from './calculator';
import { PROKER_PARAMETERS, AGENDA_PARAMETERS } from './parameters';

/**
 * Export all assessed activities to an Excel file with styling.
 */
export async function exportToExcel(activities: Activity[]) {
  if (activities.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Rekap Penilaian R100HK');

  const prokerParams = PROKER_PARAMETERS.map(p => p.code);
  const agendaParams = AGENDA_PARAMETERS.map(p => p.code);
  const allParams = Array.from(new Set([...prokerParams, ...agendaParams])).sort();

  // Define columns
  const columns = [
    { header: 'No', key: 'no', width: 5 },
    { header: 'Nama Proker/Agenda', key: 'name', width: 35 },
    { header: 'Jenis', key: 'type', width: 15 },
    { header: 'Tahap', key: 'stage', width: 8 },
    ...allParams.map(code => ({ header: code, key: code, width: 6 })),
    { header: 'Nilai Akhir', key: 'finalScore', width: 12 },
    { header: 'Predikat', key: 'predicate', width: 15 },
  ];

  worksheet.columns = columns;

  // Style Header
  const headerRow = worksheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E3A5F' } // Biru Tua
    };
    cell.font = {
      color: { argb: 'FFFFFFFF' }, // Putih
      bold: true
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Add Data
  activities.forEach((activity, index) => {
    const result = calculateScore(activity);
    const predicate = getPredicate(result.finalScore);
    
    interface RowData {
      no: number;
      name: string;
      type: string;
      stage: number;
      finalScore: number;
      predicate: string;
      [key: string]: string | number;
    }

    const rowData: RowData = {
      no: index + 1,
      name: activity.name,
      type: activity.type === 'proker' ? 'Program Kerja' : 'Agenda',
      stage: activity.stage,
      finalScore: result.finalScore,
      predicate: predicate.label
    };

    allParams.forEach(code => {
      const paramResult = result.parameterResults.find(r => r.code === code);
      rowData[code] = paramResult ? paramResult.score : '-';
    });

    const row = worksheet.addRow(rowData);

    // Style Row based on type
    const isProker = activity.type === 'proker';
    row.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: isProker ? 'FFEBF3FF' : 'FFFFFDE7' } // Biru Muda or Kuning Muda
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
      if (Number(cell.col) === 2) cell.alignment = { vertical: 'middle', horizontal: 'left' }; // Name left aligned
    });

    // Conditional Formatting for Nilai Akhir
    const finalScoreCell = row.getCell('finalScore');
    const score = result.finalScore;
    if (score < 46) {
      finalScoreCell.font = { color: { argb: 'FFFF0000' }, bold: true }; // Merah
    } else if (score <= 75) {
      finalScoreCell.font = { color: { argb: 'FFCCCC00' }, bold: true }; // Kuning/Amber
    } else {
      finalScoreCell.font = { color: { argb: 'FF008000' }, bold: true }; // Hijau
    }
  });

  // Write to buffer and save
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Rekap_Penilaian_R100HK_${new Date().toISOString().split('T')[0]}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
