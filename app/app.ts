import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import Settings from './components/Settings.vue'
import EntryActionDialog from './components/dialogs/EntryActionDialog.vue'
import store from './store'
import { BetService } from './services/BetService'
import { Frame } from '@nativescript/core'

declare let __DEV__: boolean;

Vue.config.silent = !__DEV__

Vue.registerElement(
  'EntryActionDialog',
  () => require('@nativescript/core').ModalDialog
);

// Initialize navigation
Vue.prototype.$navigateBack = () => {
  Frame.topmost().goBack();
};

Vue.prototype.$navigateTo = (component: any, options = {}) => {
  return Frame.topmost().navigate({
    create: () => {
      const componentInstance = new Vue({
        render: h => h(component)
      });
      return componentInstance.$mount().$el.nativeView;
    },
    ...options
  });
};

// Initialize database and load saved bets
BetService.initialize().catch(error => {
  console.error('Failed to initialize database:', error);
});

new Vue({
  store,
  render: (h) => h('frame', [h(Home)])
}).$start()