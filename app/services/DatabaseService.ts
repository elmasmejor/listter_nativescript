import * as SQLite from 'nativescript-sqlite';
import { BetEntry, GameState } from '../types';

export class DatabaseService {
  private static db: any;
  private static readonly DB_NAME = 'bets.db';

  static async initialize(): Promise<void> {
    try {
      if (!this.db) {
        this.db = await new SQLite(this.DB_NAME);
        await this.createTables();
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private static async createTables(): Promise<void> {
    const CREATE_BETS_TABLE = `
      CREATE TABLE IF NOT EXISTS bets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        number1 TEXT NOT NULL,
        number2 TEXT,
        amount TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now'))
      )
    `;

    await this.db.execSQL(CREATE_BETS_TABLE);
  }

  static async saveBet(type: string, bet: BetEntry): Promise<void> {
    const INSERT_BET = `
      INSERT INTO bets (type, number1, number2, amount)
      VALUES (?, ?, ?, ?)
    `;

    await this.db.execSQL(INSERT_BET, [
      type,
      bet.number1,
      bet.number2 || null,
      bet.amount
    ]);
  }

  static async updateBet(type: string, bet: BetEntry): Promise<void> {
    const UPDATE_BET = `
      UPDATE bets 
      SET number1 = ?, number2 = ?, amount = ?
      WHERE id = ? AND type = ?
    `;

    await this.db.execSQL(UPDATE_BET, [
      bet.number1,
      bet.number2 || null,
      bet.amount,
      bet.id,
      type
    ]);
  }

  static async deleteBet(type: string, id: number): Promise<void> {
    const DELETE_BET = `
      DELETE FROM bets 
      WHERE id = ? AND type = ?
    `;

    await this.db.execSQL(DELETE_BET, [id, type]);
  }

  static async loadBets(): Promise<GameState> {
    const SELECT_BETS = `
      SELECT id, type, number1, number2, amount 
      FROM bets 
      ORDER BY created_at DESC
    `;

    const gameState: GameState = {
      fijos: [],
      parles: [],
      centenas: [],
      balance: 0
    };

    await this.db.all(SELECT_BETS, [], (err: Error, rows: any[]) => {
      if (err) {
        console.error('Error loading bets:', err);
        return;
      }

      rows.forEach((row: any) => {
        const bet: BetEntry = {
          id: row[0],
          number1: row[2],
          number2: row[3],
          amount: row[4]
        };

        switch (row[1]) {
          case 'fijos':
            gameState.fijos.push(bet);
            break;
          case 'parles':
            gameState.parles.push(bet);
            break;
          case 'centenas':
            gameState.centenas.push(bet);
            break;
        }
      });
    });

    return gameState;
  }
}