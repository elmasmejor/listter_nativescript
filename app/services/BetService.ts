import store from '../store';
import { BetEntry } from '../types';
import { DatabaseService } from './DatabaseService';

export class BetService {
  static async initialize() {
    await DatabaseService.initialize();
    await this.loadBets();
  }

  static async addBet(type: string, bet: BetEntry) {
    console.log('BetService.addBet:', { type, bet });
    try {
      await DatabaseService.saveBet(type, bet);
      store.commit('bets/ADD_BET', { type, bet });
      console.log('Bet added successfully');
    } catch (error) {
      console.error('Error adding bet:', error);
      throw error;
    }
  }

  static async updateBet(type: string, bet: BetEntry) {
    console.log('BetService.updateBet:', { type, bet });
    try {
      await DatabaseService.updateBet(type, bet);
      store.commit('bets/UPDATE_BET', { type, bet });
      console.log('Bet updated successfully');
    } catch (error) {
      console.error('Error updating bet:', error);
      throw error;
    }
  }

  static async deleteBet(type: string, id: number) {
    console.log('BetService.deleteBet:', { type, id });
    try {
      await DatabaseService.deleteBet(type, id);
      store.commit('bets/DELETE_BET', { type, id });
      console.log('Bet deleted successfully');
    } catch (error) {
      console.error('Error deleting bet:', error);
      throw error;
    }
  }

  static async loadBets() {
    console.log('BetService.loadBets: Loading bets...');
    try {
      const gameState = await DatabaseService.loadBets();
      store.commit('bets/LOAD_BETS', gameState);
      console.log('Bets loaded successfully:', gameState);
    } catch (error) {
      console.error('Error loading bets:', error);
      throw error;
    }
  }
}