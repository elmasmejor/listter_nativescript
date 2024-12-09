<template>
  <Label :text="'Limpio: $' + formatBalance(balance)" class="font-bold text-lg text-center"/>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Balance',
  props: {
    balance: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatBalance(value: number): string {
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
});
</script>