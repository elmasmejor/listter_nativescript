import * as SQLite from 'nativescript-sqlite';
import { BetEntry, GameState } from '../types';
import { CURRENT_VERSION } from './database/schema';
import { initializeDatabase, getCurrentVersion, setVersion } from './database/migrations';
import { INSERT_BET, UPDATE_BET, DELETE_BET, SELECT_BETS } from './database/queries';

export class DatabaseService {
  private static db: SQLite.SQLite;
  private static readonly DB_NAME = 'bets.db';

  static async initialize(): Promise<void> {
    try {
      if (!this.db) {
        this.db = await new SQLite(this.DB_NAME);
        const version = await getCurrentVersion(this.db);
        
        if (version < CURRENT_VERSION) {
          await initializeDatabase(this.db);
          await setVersion(this.db, CURRENT_VERSION);
        }
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  static async saveBet(type: string, bet: BetEntry): Promise<void> {
    await this.db.execSQL(INSERT_BET, [
      type,
      bet.number1,
      bet.amount1 || null,
      bet.amount2 || null
    ]);
  }

  static async updateBet(type: string, bet: BetEntry): Promise<void> {
    await this.db.execSQL(UPDATE_BET, [
      bet.number1,
      bet.amount1 || null,
      bet.amount2 || null,
      bet.id,
      type
    ]);
  }

  static async deleteBet(type: string, id: number): Promise<void> {
    await this.db.execSQL(DELETE_BET, [id, type]);
  }

  static async loadBets(): Promise<GameState> {
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
          amount1: row[3],
          amount2: row[4]
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