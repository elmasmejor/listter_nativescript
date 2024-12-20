<template>
  <GridLayout rows="auto" columns="*,*,*" class="input-row">
    <BaseInput
      col="0"
      :maxLength="2"
      hint="#"
      :formatter="formatTwoDigits"
      v-model="number"
      @return="focusAmount1"
      ref="numberInput"
      :showError="showError && !isValidNumber"
    />
    <BaseInput
      col="1"
      :maxLength="10"
      hint="$F"
      :formatter="formatAmount"
      v-model="amount1"
      @return="focusAmount2"
      ref="amount1Input"
      :showError="showError && !isValidAmounts"
      keyboardType="number"
    />
    <BaseInput
      col="2"
      :maxLength="10"
      hint="$C"
      :formatter="formatAmount"
      v-model="amount2"
      @return="submit"
      ref="amount2Input"
      :showError="showError && !isValidAmounts"
      keyboardType="number"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import BaseInput from './BaseInput.vue';
import { formatTwoDigits } from '../../utils/formatters/numberFormatter';
import { formatAmount } from '../../utils/formatters/currencyFormatter';
import { validateFijosNumber, validateFijosAmounts } from '../../utils/validators/betValidators';
import { BetEntry } from '../../types';

export default Vue.extend({
  components: {
    BaseInput
  },
  props: {
    editingEntry: {
      type: Object as () => BetEntry | null,
      default: null
    }
  },
  data() {
    return {
      number: '',
      amount1: '',
      amount2: '',
      showError: false
    };
  },
  computed: {
    isValidNumber(): boolean {
      const isValid = validateFijosNumber(this.number) === null;
      console.log('Validando número:', { number: this.number, isValid });
      return isValid;
    },
    isValidAmounts(): boolean {
      const isValid = validateFijosAmounts(this.amount1, this.amount2) === null;
      console.log('Validando montos:', { amount1: this.amount1, amount2: this.amount2, isValid });
      return isValid;
    },
    isValid(): boolean {
      const isValid = this.isValidNumber && this.isValidAmounts;
      console.log('Validación completa:', { isValid, number: this.number, amount1: this.amount1, amount2: this.amount2 });
      return isValid;
    }
  },
  methods: {
    formatTwoDigits,
    formatAmount,
    focusAmount1() {
      (this.$refs.amount1Input as any).nativeView.focus();
    },
    focusAmount2() {
      (this.$refs.amount2Input as any).nativeView.focus();
    },
    submit() {
      console.log('Intentando submit con:', { 
        number: this.number, 
        amount1: this.amount1, 
        amount2: this.amount2,
        isValid: this.isValid 
      });

      if (this.isValid) {
        const data: BetEntry = {
          number1: this.number,
          amount1: this.amount1 || null,
          amount2: this.amount2 || null
        };

        console.log('Emitiendo datos:', data);
        this.$emit('submit', data);
        this.clear();
        (this.$refs.numberInput as any).nativeView.focus();
      } else {
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 800);
      }
    },
    clear() {
      this.number = '';
      this.amount1 = '';
      this.amount2 = '';
      this.showError = false;
      (this.$refs.numberInput as any).clear();
      (this.$refs.amount1Input as any).clear();
      (this.$refs.amount2Input as any).clear();
    }
  }
});
</script>