"use client"

import PowerListDB from '@/backend/powerList';
import StandardsDB from '@/backend/standards';

interface ExportData {
  powerLists: Record<string, unknown>;
  standards: Record<string, unknown>;
  exportedAt: string;
  version: string;
}

const parseDate = (dateStr: string): number => {
  const [month, day, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day).getTime();
};

const exportToJSON = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  const powerLists = await PowerListDB.getAllPowerLists();
  const standards = await StandardsDB.getAllStandardsLists();

  const sortedPowerLists = Object.keys(powerLists)
    .sort((a, b) => parseDate(b) - parseDate(a))
    .reduce((acc, date) => {
      acc[date] = powerLists[date];
      return acc;
    }, {} as Record<string, unknown>);

  const sortedStandards = Object.keys(standards)
    .sort((a, b) => parseDate(b) - parseDate(a))
    .reduce((acc, date) => {
      acc[date] = standards[date];
      return acc;
    }, {} as Record<string, unknown>);

  const exportData: ExportData = {
    powerLists: sortedPowerLists,
    standards: sortedStandards,
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };

  const jsonString = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `powerlist-export-${timestamp}.json`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ExportService = {
  exportToJSON
};

export default ExportService;
