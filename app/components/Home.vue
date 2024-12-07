<template>
  <Page>
    <ActionBar class="action-bar">
      <GridLayout columns="auto,*,auto" class="px-2">
        <Label col="0" text="App" class="font-bold text-lg"/>
        <Label col="1" :text="'Limpio: $' + gameState.balance" class="font-bold text-lg text-center"/>
        <Label col="2" text="⋮" class="text-lg text-right"/>
      </GridLayout>
    </ActionBar>

    <GridLayout rows="auto,*,auto" columns="*,*,*" class="bg-gray-100">
      <!-- Headers -->
      <Label text="Fijos y Corridos" row="0" col="0" class="section-header"/>
      <Label text="Parles" row="0" col="1" class="section-header"/>
      <Label text="Centenas" row="0" col="2" class="section-header"/>

      <!-- Main content columns -->
      <FijosSection row="1" col="0" 
        :entries="gameState.fijos"
        @edit="editFijos"
        @delete="deleteFijos"/>
      <ParlesSection row="1" col="1" 
        :entries="gameState.parles"
        @edit="editParles"
        @delete="deleteParles"/>
      <CentenasSection row="1" col="2" 
        :entries="gameState.centenas"
        @edit="editCentenas"
        @delete="deleteCentenas"/>

      <!-- Bottom input section -->
      <GridLayout row="2" col="0" rows="auto,auto" class="p-2 bg-white border-t border-gray-300">
        <FijosInput row="0" ref="fijosInput" 
          @submit="addFijos"
          :editingEntry="editingFijos"/>
        <Button row="1" :text="editingFijos ? '✓' : '+'" 
          @tap="$refs.fijosInput.submit()" 
          class="add-button"/>
      </GridLayout>

      <GridLayout row="2" col="1" rows="auto,auto" class="p-2 bg-white border-t border-gray-300">
        <ParlesInput row="0" ref="parlesInput" 
          @submit="addParles"
          :editingEntry="editingParles"/>
        <Button row="1" :text="editingParles ? '✓' : '+'" 
          @tap="$refs.parlesInput.submit()" 
          class="add-button"/>
      </GridLayout>

      <GridLayout row="2" col="2" rows="auto,auto" class="p-2 bg-white border-t border-gray-300">
        <CentenasInput row="0" ref="centenasInput" 
          @submit="addCentenas"
          :editingEntry="editingCentenas"/>
        <Button row="1" :text="editingCentenas ? '✓' : '+'" 
          @tap="$refs.centenasInput.submit()" 
          class="add-button"/>
      </GridLayout>
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
import { GameState, BetEntry } from '../types';

let nextId = 1;

export default Vue.extend({
  components: {
    FijosInput,
    ParlesInput,
    CentenasInput,
    FijosSection,
    ParlesSection,
    CentenasSection
  },
  data() {
    return {
      gameState: {
        fijos: [],
        parles: [],
        centenas: [],
        balance: 523.90
      },
      editingFijos: null as BetEntry | null,
      editingParles: null as BetEntry | null,
      editingCentenas: null as BetEntry | null
    };
  },
  methods: {
    addFijos(entry: BetEntry) {
      if (this.editingFijos) {
        const index = this.gameState.fijos.findIndex(e => e.id === this.editingFijos?.id);
        if (index !== -1) {
          this.gameState.fijos.splice(index, 1, { ...entry, id: this.editingFijos.id });
        }
        this.editingFijos = null;
      } else {
        this.gameState.fijos.push({ ...entry, id: nextId++ });
      }
    },
    addParles(entry: BetEntry) {
      if (this.editingParles) {
        const index = this.gameState.parles.findIndex(e => e.id === this.editingParles?.id);
        if (index !== -1) {
          this.gameState.parles.splice(index, 1, { ...entry, id: this.editingParles.id });
        }
        this.editingParles = null;
      } else {
        this.gameState.parles.push({ ...entry, id: nextId++ });
      }
    },
    addCentenas(entry: BetEntry) {
      if (this.editingCentenas) {
        const index = this.gameState.centenas.findIndex(e => e.id === this.editingCentenas?.id);
        if (index !== -1) {
          this.gameState.centenas.splice(index, 1, { ...entry, id: this.editingCentenas.id });
        }
        this.editingCentenas = null;
      } else {
        this.gameState.centenas.push({ ...entry, id: nextId++ });
      }
    },
    editFijos(entry: BetEntry) {
      this.editingFijos = entry;
      (this.$refs.fijosInput as any).setData(entry);
    },
    editParles(entry: BetEntry) {
      this.editingParles = entry;
      (this.$refs.parlesInput as any).setData(entry);
    },
    editCentenas(entry: BetEntry) {
      this.editingCentenas = entry;
      (this.$refs.centenasInput as any).setData(entry);
    },
    deleteFijos(id: number) {
      const index = this.gameState.fijos.findIndex(e => e.id === id);
      if (index !== -1) {
        this.gameState.fijos.splice(index, 1);
      }
    },
    deleteParles(id: number) {
      const index = this.gameState.parles.findIndex(e => e.id === id);
      if (index !== -1) {
        this.gameState.parles.splice(index, 1);
      }
    },
    deleteCentenas(id: number) {
      const index = this.gameState.centenas.findIndex(e => e.id === id);
      if (index !== -1) {
        this.gameState.centenas.splice(index, 1);
      }
    }
  }
});
</script>

<style lang="css" scoped>
.action-bar {
  background-color: #65adf1;
  color: white;
}
.add-button {
  background-color: #65adf1;
  color: white;
  font-size: 20;
  font-weight: bold;
  border-radius: 4;
  height: 40;
  margin-top: 8;
}
.section-header {
  text-align: center;
  padding: 12;
  background-color: white;
  border-bottom-width: 1;
  border-bottom-color: #d1d5db;
  font-weight: bold;
}
</style>