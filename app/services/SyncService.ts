import { AuthService } from './AuthService';
import { HttpService } from './HttpService';
import { BetEntry } from '../types';
import store from '../store';

export class SyncService {
  static async syncBets(): Promise<boolean> {
    try {
      const accessToken = AuthService.getAccessToken();
      if (!accessToken) {
        throw new Error('No hay token de acceso');
      }

      const bets = this.prepareBetsForSync();
      
      const response = await HttpService.post('/api/bets/sync', bets, {
        'Authorization': `Bearer ${accessToken}`
      });

      if (response.success) {
        // Actualizar última sincronización
        store.commit('settings/UPDATE_LAST_SYNC', new Date().toISOString());
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error en sincronización:', error);
      return false;
    }
  }

  private static prepareBetsForSync() {
    const state = store.state.bets;
    return {
      fijos: state.fijos.map(this.formatBet),
      parles: state.parles.map(this.formatBet),
      centenas: state.centenas.map(this.formatBet)
    };
  }

  private static formatBet(bet: BetEntry) {
    return {
      number1: bet.number1,
      number2: bet.number2,
      amount: parseFloat(bet.amount)
    };
  }
}