import Vue from 'vue';
import Vuex from 'vuex';
import { bets } from './modules/bets';
import { settings } from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bets,
    settings
  }
});