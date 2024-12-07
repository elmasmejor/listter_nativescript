<template>
  <GridLayout rows="auto" columns="*,*,*" class="input-row">
    <BaseInput
      col="0"
      :maxLength="2"
      hint="#"
      :formatter="formatTwoDigits"
      v-model="number1"
      @return="focusNumber2"
      ref="input1"
      :showError="showError && !isValidFijoOrCorrido"
    />
    <BaseInput
      col="1"
      :maxLength="2"
      hint="#"
      :formatter="formatTwoDigits"
      v-model="number2"
      @return="focusAmount"
      ref="input2"
      :showError="showError && !isValidFijoOrCorrido"
    />
    <BaseInput
      col="2"
      :maxLength="10"
      hint="$"
      :formatter="formatAmount"
      v-model="amount"
      @return="submit"
      ref="amountInput"
      :showError="showError && !isValidAmount"
      keyboardType="number"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseInput from './BaseInput.vue';
import { formatTwoDigits } from '../../utils/formatters/numberFormatter';
import { formatAmount } from '../../utils/formatters/currencyFormatter';
import { validateFijosInput } from '../../utils/validators/betValidators';
import { validateAmount } from '../../utils/validators/amountValidator';
import { BetEntry } from '../../types';

export default Vue.extend({
  components: {
    BaseInput
  },
  data() {
    return {
      number1: '',
      number2: '',
      amount: '',
      showError: false
    };
  },
  methods: {
    formatTwoDigits,
    formatAmount,
    focusNumber2() {
      (this.$refs.input2 as any).nativeView.focus();
    },
    focusAmount() {
      (this.$refs.amountInput as any).nativeView.focus();
    },
    submit() {
      if (this.isValid) {
        this.$emit('submit', this.getData());
        this.clear();
        (this.$refs.input1 as any).nativeView.focus();
      } else {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 800);
      }
    },
    clear() {
      this.number1 = '';
      this.number2 = '';
      this.amount = '';
      this.showError = false;
      (this.$refs.input1 as any).clear();
      (this.$refs.input2 as any).clear();
      (this.$refs.amountInput as any).clear();
    },
    getData(): BetEntry {
      return {
        number1: this.number1,
        number2: this.number2,
        amount: this.amount
      };
    }
  },
  computed: {
    isValidFijoOrCorrido(): boolean {
      return validateFijosInput(this.number1, this.number2) === null;
    },
    isValidAmount(): boolean {
      return validateAmount(this.amount) === null;
    },
    isValid(): boolean {
      return this.isValidFijoOrCorrido && this.isValidAmount;
    }
  }
});
</script>

<style scoped>
.input-row {
  padding: 4;
}
</style>