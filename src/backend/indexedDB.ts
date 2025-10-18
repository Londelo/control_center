"use client"

import { PowerList } from '@/types/powerList';
import { StandardTask } from '@/types/standards';
import Dexie, { type EntityTable } from 'dexie';

const V1_DB = {
  PowerList: 'id, date',
  Standards: 'id, date'
};

export type DataBases = keyof typeof V1_DB;

type TableEntityMap = {
  PowerList: PowerList
  Standards: StandardTask
};

const indexDB = new Dexie('ControlCenterDB') as Dexie & {
  PowerList: EntityTable<PowerList, 'id'>;
  Standards: EntityTable<StandardTask, 'id'>;
};

const handleOpenDatabase = async (): Promise<void> => {
  try {
    if (await indexDB.isOpen()) await indexDB.close();
    await indexDB.version(1).stores(V1_DB);
    await indexDB.open();
  } catch (databaseOpenError: any) {
    // eslint-disable-next-line no-console
    console.error('Open failed: ' + (databaseOpenError?.stack || databaseOpenError));
    throw new Error("Failed to Init DB");
  }
};

const getTable = <TableName extends DataBases>(tableName: TableName) =>
  indexDB[tableName] as unknown as EntityTable<TableEntityMap[TableName], 'id'>;

const upsert = async <TableName extends DataBases>(
  tableName: TableName,
  value: TableEntityMap[TableName]
): Promise<void> => {
  const selectedTable = getTable(tableName);
  await selectedTable.put(value, value.id as any);
};

const remove = async <TableName extends DataBases>(
  tableName: TableName,
  id: any
): Promise<void> => {
  const selectedTable = getTable(tableName);
  await selectedTable.delete(id);
};

const getAll = async <TableName extends DataBases>(
  tableName: TableName
): Promise<TableEntityMap[TableName][]> => {
  const selectedTable = getTable(tableName);
  return selectedTable.toArray()
};

const ControlCenterDB = {
  handleOpenDatabase,
  upsert,
  getAll,
  remove
};

export default ControlCenterDB;
