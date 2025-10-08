"use client"

import PowerListDB from '@/backend/powerList';

interface ExportData {
  powerLists: Record<string, unknown>;
  lastViewedDate: string;
  exportedAt: string;
  version: string;
}

const exportToJSON = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  const powerLists = await PowerListDB.getAllPowerLists();
  const lastViewedDate = PowerListDB.getLastViewedDate();

  const exportData: ExportData = {
    powerLists,
    lastViewedDate,
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
