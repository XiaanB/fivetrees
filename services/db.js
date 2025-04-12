// services/db.js
import * as SQLite from 'expo-sqlite';

console.log("SQLite module:", SQLite);
let db;

export const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('userData.db');
  }
  return db;
};