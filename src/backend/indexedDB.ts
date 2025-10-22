"use client"

import { PowerList } from '@/types/powerList';
import { Standards } from '@/types/standards';
import { ToDoTasks } from '@/types/todoToday';
import Dexie, { type EntityTable } from 'dexie';

const V1_DB = {
  PowerList: 'date',
  Standards: 'date',
  ToDoToday: 'date'
};

export type DataBases = keyof typeof V1_DB;

type TableEntityMap = {
  PowerList: PowerList
  Standards: Standards
  ToDoToday: ToDoTasks
};

const indexDB = new Dexie('ControlCenterDB') as Dexie & {
  PowerList: EntityTable<PowerList, 'date'>;
  Standards: EntityTable<Standards, 'date'>;
  ToDoToday: EntityTable<ToDoTasks, 'date'>;
};

const handleOpenDatabase = async (): Promise<void> => {
  try {
    if (await indexDB.isOpen()) await indexDB.close();
    await indexDB.version(3).stores(V1_DB).upgrade;
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
  value: TableEntityMap[TableName],
  key: any
): Promise<void> => {
  const selectedTable = getTable(tableName);
  await selectedTable.put(value, key);
};

const remove = async <TableName extends DataBases>(
  tableName: TableName,
  key: any
): Promise<void> => {
  const selectedTable = getTable(tableName);
  await selectedTable.delete(key);
};

const getAll = async <TableName extends DataBases>(
  tableName: TableName
): Promise<TableEntityMap[TableName]> => {
  const selectedTable = getTable(tableName);
  return selectedTable.toCollection() as TableEntityMap[TableName]
};

const clearAll = async <TableName extends DataBases>(
  tableName: TableName
): Promise<void> => {
  const selectedTable = getTable(tableName);
  await selectedTable.clear()
};

const ControlCenterDB = {
  ...indexDB,
  handleOpenDatabase,
  upsert,
  getAll,
  remove,
  getTable,
  clearAll
};

export default ControlCenterDB;
