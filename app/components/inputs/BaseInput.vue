<template>
  <GridLayout rows="auto" columns="*" class="input-container">
    <TextField
      v-model="displayValue"
      :keyboardType="keyboardType"
      :maxLength="maxLength"
      :hint="hint"
      class="input text-center"
      :class="{ 'input-error': showError }"
      @textChange="onTextChange"
      @returnPress="onReturnPress"
      @focus="onFocus"
      @blur="onBlur"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    maxLength: {
      type: Number,
      required: true
    },
    hint: {
      type: String,
      required: true
    },
    formatter: {
      type: Function,
      required: true
    },
    showError: {
      type: Boolean,
      default: false
    },
    keyboardType: {
      type: String,
      default: 'number'
    }
  },
  data() {
    return {
      value: '',
      displayValue: '',
      touched: false,
      isFocused: false
    };
  },
  methods: {
    onTextChange(event: any) {
      this.value = this.formatter(event.value);
      this.displayValue = this.value;
      this.$emit('input', this.value);
    },
    onReturnPress() {
      this.$emit('return');
    },
    onFocus() {
      this.isFocused = true;
      this.touched = true;
      this.$emit('focus');
    },
    onBlur() {
      this.isFocused = false;
      this.$emit('blur');
    },
    clear() {
      this.value = '';
      this.displayValue = '';
      this.touched = false;
    }
  }
});
</script>

<style scoped>
.input-container {
  margin: 2;
}
.input {
  border-width: 1;
  border-color: #d1d5db;
  border-radius: 4;
  padding: 4;
  height: 40;
  font-size: 16;
  background-color: white;
}
</style>