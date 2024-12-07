<template>
  <StackLayout class="border-r">
    <ScrollView>
      <StackLayout class="section-content">
        <GridLayout v-for="(entry, index) in entries" :key="entry.id" 
                   rows="auto" columns="auto,*,auto" class="entry-row"
                   @longPress="showDialog(entry)">
          <Label :text="entry.number1" col="0" class="number-label"/>
          <Label :text="entry.number2" col="1" class="number-label ml-2"/>
          <CircleNumber :text="entry.amount" col="2"/>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import { BetEntry } from '../../types';
import CircleNumber from '../common/CircleNumber.vue';
import { Frame } from '@nativescript/core';
import EntryActionDialog from '../dialogs/EntryActionDialog.vue';

export default Vue.extend({
  components: {
    CircleNumber,
    EntryActionDialog
  },
  props: {
    entries: {
      type: Array as () => BetEntry[],
      default: () => []
    }
  },
  methods: {
    showDialog(entry: BetEntry) {
      this.$showModal(EntryActionDialog, {
        fullscreen: false,
        animated: true,
        stretched: false,
        props: {
          title: `${entry.number1}${entry.number2 ? ' - ' + entry.number2 : ''}`
        }
      }).then((action?: string) => {
        if (action === 'edit') {
          this.$emit('edit', entry);
        } else if (action === 'delete') {
          this.$emit('delete', entry.id);
        }
      });
    }
  }
});
</script>

<style scoped>
.entry-row {
  padding: 8 12;
  margin-bottom: 4;
}
</style>