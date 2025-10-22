"use client"

import { PowerList } from '@/types/powerList';
import { Standard } from '@/types/standards';
import { ToDoList } from '@/types/todoToday';
import Dexie, { type EntityTable } from 'dexie';

const V1_DB = {
  PowerList: 'date',
  Standard: 'date',
  ToDoToday: 'date'
};

export type DataBases = keyof typeof V1_DB;

type TableEntityMap = {
  PowerList: PowerList
  Standard: Standard
  ToDoToday: ToDoList
};

const indexDB = new Dexie('ControlCenterDB') as Dexie & {
  PowerList: EntityTable<PowerList, 'date'>;
  Standard: EntityTable<Standard, 'date'>;
  ToDoToday: EntityTable<ToDoList, 'date'>;
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
): Promise<TableEntityMap[TableName][]> => {
  const selectedTable = getTable(tableName);
  return selectedTable.toArray()
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
