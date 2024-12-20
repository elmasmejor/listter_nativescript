import * as SQLite from 'nativescript-sqlite';
import { CREATE_TABLES_SQL, DROP_TABLES_SQL } from './schema';

export async function initializeDatabase(db: SQLite.SQLite): Promise<void> {
  await db.execSQL(DROP_TABLES_SQL);
  await db.execSQL(CREATE_TABLES_SQL);
}

export async function getCurrentVersion(db: SQLite.SQLite): Promise<number> {
  const result = await db.get('PRAGMA user_version');
  return result?.user_version || 1;
}

export async function setVersion(db: SQLite.SQLite, version: number): Promise<void> {
  await db.execSQL(`PRAGMA user_version = ${version}`);
}