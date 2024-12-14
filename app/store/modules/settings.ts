import { AppSettings } from '../../types/settings';
import { getSettings, saveSettings } from '../../utils/storage';

const state = getSettings();

const mutations = {
  UPDATE_SETTINGS(state: AppSettings, settings: Partial<AppSettings>) {
    Object.assign(state, settings);
    saveSettings(state);
  },
  UPDATE_LAST_SYNC(state: AppSettings, timestamp: string) {
    state.lastSync = timestamp;
    saveSettings(state);
  },
  RESET_SETTINGS(state: AppSettings) {
    Object.assign(state, getSettings());
  }
};

const actions = {
  updateSettings({ commit }, settings: Partial<AppSettings>) {
    commit('UPDATE_SETTINGS', settings);
  },
  resetSettings({ commit }) {
    commit('RESET_SETTINGS');
  }
};

export const settings = {
  namespaced: true,
  state,
  mutations,
  actions
};