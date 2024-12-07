<template>
  <GridLayout rows="auto" columns="*,*,*" class="input-row p-1">
    <TextField
      col="0"
      v-model="number1"
      keyboardType="number"
      :maxLength="isThreeDigits ? 3 : 2"
      :hint="isThreeDigits ? '###' : '##'"
      class="input text-center"
      @textChange="onNumber1Change"
    />
    <TextField
      v-if="showTwoDigits"
      col="1"
      v-model="number2"
      keyboardType="number"
      maxLength="2"
      hint="##"
      class="input text-center"
      @textChange="onNumber2Change"
    />
    <TextField
      :col="showTwoDigits ? '2' : '1'"
      v-model="amount"
      keyboardType="number"
      hint="$"
      class="input text-center amount-input"
      @textChange="onAmountChange"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import { formatTwoDigits, formatThreeDigits, formatAmount } from '../utils/numberFormatters';
import { BetEntry } from '../types';

export default Vue.extend({
  props: {
    showTwoDigits: {
      type: Boolean,
      default: false
    },
    isThreeDigits: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      number1: '',
      number2: '',
      amount: ''
    };
  },
  methods: {
    onNumber1Change(event: any) {
      this.number1 = this.isThreeDigits 
        ? formatThreeDigits(event.value) 
        : formatTwoDigits(event.value);
    },
    onNumber2Change(event: any) {
      this.number2 = formatTwoDigits(event.value);
    },
    onAmountChange(event: any) {
      this.amount = formatAmount(event.value);
    },
    clear() {
      this.number1 = '';
      this.number2 = '';
      this.amount = '';
    },
    getData(): BetEntry {
      return {
        number1: this.number1,
        number2: this.showTwoDigits ? this.number2 : undefined,
        amount: this.amount
      };
    }
  }
});
</script>

<style scoped>
.input {
  border-width: 1;
  border-color: #d1d5db;
  border-radius: 4;
  padding: 4;
  margin: 2;
  height: 35;
  font-size: 16;
}
.amount-input {
  color: #374151;
}
</style>