<template>
  <Label :text="text" class="circle-number"/>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.circle-number {
  background-color: white;
  border-width: 1;
  border-color: #d1d5db;
  border-radius: 999;
  min-width: 40;
  height: 40;
  text-align: center;
  vertical-align: middle;
  font-size: 14;
  font-weight: bold;
  padding: 10 14;
}
</style>