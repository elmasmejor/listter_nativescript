import { BetEntry, GameState } from '../../types';

const state = {
  fijos: [],
  parles: [],
  centenas: [],
  balance: 0
};

const mutations = {
  ADD_BET(state: GameState, { type, bet }: { type: string; bet: BetEntry }) {
    state[type].push({ ...bet, id: Date.now() });
  },
  UPDATE_BET(state: GameState, { type, bet }: { type: string; bet: BetEntry }) {
    const index = state[type].findIndex(b => b.id === bet.id);
    if (index !== -1) {
      state[type].splice(index, 1, bet);
    }
  },
  DELETE_BET(state: GameState, { type, id }: { type: string; id: number }) {
    const index = state[type].findIndex(b => b.id === id);
    if (index !== -1) {
      state[type].splice(index, 1);
    }
  },
  LOAD_BETS(state: GameState, gameState: GameState) {
    Object.assign(state, gameState);
  }
};

const getters = {
  totalBalance: (state: GameState) => {
    const totalBets = [
      ...state.fijos,
      ...state.parles,
      ...state.centenas
    ].reduce((sum, bet) => {
      const amount1 = parseFloat(bet.amount1 || '0');
      const amount2 = parseFloat(bet.amount2 || '0');
      return sum + amount1 + amount2;
    }, 0);
    
    return Number((totalBets * 0.05).toFixed(2));
  }
};

export const bets = {
  namespaced: true,
  state,
  mutations,
  getters
};