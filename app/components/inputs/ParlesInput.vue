<template>
  <GridLayout rows="auto" columns="*,*" class="input-row">
    <BaseInput
      col="0"
      :maxLength="2"
      hint="#"
      :formatter="formatTwoDigits"
      v-model="number1"
      @return="focusAmount"
      ref="numberInput"
      :showError="showError && !isValidNumber"
    />
    <BaseInput
      col="1"
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
import { validateParlesInput } from '../../utils/validators/betValidators';
import { validateAmount } from '../../utils/validators/amountValidator';
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
      number1: '',
      amount: '',
      showError: false
    };
  },
  watch: {
    editingEntry(entry: BetEntry | null) {
      if (entry) {
        this.number1 = entry.number1;
        this.amount = entry.amount;
      }
    }
  },
  computed: {
    isValidNumber(): boolean {
      return validateParlesInput(this.number1) === null;
    },
    isValidAmount(): boolean {
      return validateAmount(this.amount) === null;
    },
    isValid(): boolean {
      return this.isValidNumber && this.isValidAmount;
    }
  },
  methods: {
    formatTwoDigits,
    formatAmount,
    focusAmount() {
      (this.$refs.amountInput as any).nativeView.focus();
    },
    submit() {
      if (this.isValid) {
        this.$emit('submit', {
          number1: this.number1,
          amount: this.amount
        });
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
      this.number1 = '';
      this.amount = '';
      this.showError = false;
    },
    setData(entry: BetEntry) {
      this.number1 = entry.number1;
      this.amount = entry.amount;
    }
  }
});
</script>

<style scoped>
.input-row {
  padding: 4;
}
</style>