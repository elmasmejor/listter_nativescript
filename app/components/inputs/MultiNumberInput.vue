<template>
  <GridLayout rows="auto" columns="*,*" class="input-row">
    <TextField
      col="0"
      v-model="currentNumber"
      hint="##"
      :maxLength="2"
      class="number-input"
      :class="{ 'input-error': showError && !isValidCurrentNumber }"
      @textChange="onNumberChange"
      @returnPress="addNumber"
      ref="numberInput"
      keyboardType="number"
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
    <ScrollView row="1" colSpan="2" class="numbers-list">
      <StackLayout>
        <Label
          v-for="(num, index) in numbers"
          :key="index"
          :text="num"
          class="number-item"
          @tap="removeNumber(index)"
        />
      </StackLayout>
    </ScrollView>
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
  data() {
    return {
      currentNumber: '',
      numbers: [] as string[],
      amount: '',
      showError: false
    };
  },
  computed: {
    isValidCurrentNumber(): boolean {
      return this.currentNumber === '' || validateParlesInput(this.currentNumber) === null;
    },
    isValidAmount(): boolean {
      return validateAmount(this.amount) === null;
    },
    isValid(): boolean {
      return this.numbers.length > 0 && this.isValidAmount;
    }
  },
  methods: {
    formatAmount,
    onNumberChange(args: any) {
      if (args.value) {
        this.currentNumber = formatTwoDigits(args.value);
      } else {
        this.currentNumber = '';
      }
    },
    addNumber() {
      if (this.currentNumber && validateParlesInput(this.currentNumber) === null) {
        if (!this.numbers.includes(this.currentNumber)) {
          this.numbers.push(this.currentNumber);
        }
        this.currentNumber = '';
        if (this.numbers.length === 1) {
          (this.$refs.amountInput as any).nativeView.focus();
        }
      }
    },
    removeNumber(index: number) {
      this.numbers.splice(index, 1);
    },
    submit() {
      if (this.isValid) {
        this.numbers.forEach(number => {
          this.$emit('submit', {
            number1: number,
            amount: this.amount
          });
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
      this.currentNumber = '';
      this.numbers = [];
      this.amount = '';
      this.showError = false;
    }
  }
});
</script>

<style scoped>
.input-row {
  padding: 4;
}
.number-input {
  border-width: 1;
  border-color: #d1d5db;
  border-radius: 4;
  padding: 8;
  margin: 2;
  height: 40;
  font-size: 16;
  background-color: white;
  text-align: center;
}
.numbers-list {
  margin-top: 8;
  max-height: 120;
}
.number-item {
  font-size: 16;
  padding: 4 8;
  margin: 2;
  background-color: #f3f4f6;
  border-radius: 4;
  text-align: center;
}
</style>