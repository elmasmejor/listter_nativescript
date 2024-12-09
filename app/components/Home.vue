<template>
  <Page actionBarHidden="false">
    <ActionBar class="action-bar">
      <AppHeader :balance="$store.getters['bets/totalBalance']" @settings="navigateToSettings"/>
    </ActionBar>

    <GridLayout rows="auto,*,auto" columns="*,*,*" class="bg-gray-100">
      <!-- Section Headers -->
      <Label text="Fijos" row="0" col="0" class="text-center font-bold py-2"/>
      <Label text="Parles" row="0" col="1" class="text-center font-bold py-2"/>
      <Label text="Centenas" row="0" col="2" class="text-center font-bold py-2"/>

      <!-- Section Contents -->
      <FijosSection
        row="1"
        col="0"
        :entries="$store.state.bets.fijos"
        @edit="editFijos"
        @delete="deleteFijos"
      />
      <ParlesSection
        row="1"
        col="1"
        :entries="$store.state.bets.parles"
        @edit="editParles"
        @delete="deleteParles"
      />
      <CentenasSection
        row="1"
        col="2"
        :entries="$store.state.bets.centenas"
        @edit="editCentenas"
        @delete="deleteCentenas"
      />

      <!-- Input Sections -->
      <FijosInput
        row="2"
        col="0"
        @submit="addFijos"
        ref="fijosInput"
        :editingEntry="editingFijos"
      />
      <ParlesInput
        row="2"
        col="1"
        @submit="addParles"
        ref="parlesInput"
        :editingEntry="editingParles"
      />
      <CentenasInput
        row="2"
        col="2"
        @submit="addCentenas"
        ref="centenasInput"
        :editingEntry="editingCentenas"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import FijosInput from './inputs/FijosInput.vue';
import ParlesInput from './inputs/ParlesInput.vue';
import CentenasInput from './inputs/CentenasInput.vue';
import FijosSection from './sections/FijosSection.vue';
import ParlesSection from './sections/ParlesSection.vue';
import CentenasSection from './sections/CentenasSection.vue';
import AppHeader from './common/AppHeader.vue';
import Settings from './Settings.vue';
import { BetEntry } from '../types';
import { BetService } from '../services/BetService';

export default Vue.extend({
  name: 'Home',
  components: {
    FijosInput,
    ParlesInput,
    CentenasInput,
    FijosSection,
    ParlesSection,
    CentenasSection,
    AppHeader
  },
  data() {
    return {
      editingFijos: null as BetEntry | null,
      editingParles: null as BetEntry | null,
      editingCentenas: null as BetEntry | null
    };
  },
  methods: {
    navigateToSettings() {
      this.$navigateTo(Settings, {
        transition: {
          name: 'slideLeft'
        }
      });
    },
    async addFijos(entry: BetEntry) {
      await BetService.addBet('fijos', entry);
    },
    async addParles(entry: BetEntry) {
      await BetService.addBet('parles', entry);
    },
    async addCentenas(entry: BetEntry) {
      await BetService.addBet('centenas', entry);
    },
    async editFijos(entry: BetEntry) {
      this.editingFijos = entry;
      await BetService.updateBet('fijos', entry);
      this.editingFijos = null;
    },
    async editParles(entry: BetEntry) {
      this.editingParles = entry;
      await BetService.updateBet('parles', entry);
      this.editingParles = null;
    },
    async editCentenas(entry: BetEntry) {
      this.editingCentenas = entry;
      await BetService.updateBet('centenas', entry);
      this.editingCentenas = null;
    },
    async deleteFijos(id: number) {
      await BetService.deleteBet('fijos', id);
    },
    async deleteParles(id: number) {
      await BetService.deleteBet('parles', id);
    },
    async deleteCentenas(id: number) {
      await BetService.deleteBet('centenas', id);
    }
  }
});
</script>

<style scoped>
.action-bar {
  background-color: #65adf1;
  color: white;
}
</style>