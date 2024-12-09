<template>
  <GridLayout columns="auto,*,auto" class="px-2">
    <Label col="0" text="App" class="font-bold text-lg"/>
    <Balance col="1" :balance="balance"/>
    <Label col="2" text="⚙️" class="text-lg text-right" @tap="$emit('settings')"/>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import Balance from './Balance.vue';

export default Vue.extend({
  name: 'AppHeader',
  components: {
    Balance
  },
  props: {
    balance: {
      type: Number,
      required: true
    }
  }
});
</script>