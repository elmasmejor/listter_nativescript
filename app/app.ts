import Vue from 'nativescript-vue'
import Home from './components/Home.vue'
import EntryActionDialog from './components/dialogs/EntryActionDialog.vue'

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = !__DEV__

// Register the dialog component globally
Vue.registerElement(
  'EntryActionDialog',
  () => require('@nativescript/core').ModalDialog
);

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()