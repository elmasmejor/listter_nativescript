import store from '../store';
import { BetEntry } from '../types';
import { DatabaseService } from './DatabaseService';

export class BetService {
  static async initialize() {
    await DatabaseService.initialize();
    await this.loadBets();
  }

  static async addBet(type: string, bet: BetEntry) {
    await DatabaseService.saveBet(type, bet);
    store.commit('bets/ADD_BET', { type, bet });
  }

  static async updateBet(type: string, bet: BetEntry) {
    await DatabaseService.updateBet(type, bet);
    store.commit('bets/UPDATE_BET', { type, bet });
  }

  static async deleteBet(type: string, id: number) {
    await DatabaseService.deleteBet(type, id);
    store.commit('bets/DELETE_BET', { type, id });
  }

  static async loadBets() {
    const gameState = await DatabaseService.loadBets();
    store.commit('bets/LOAD_BETS', gameState);
  }
}