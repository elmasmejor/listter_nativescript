<template>
  <GridLayout columns="auto,auto" class="actions-container">
    <Button text="✎" @tap="$emit('edit')" class="action-button edit-button"/>
    <Button text="✕" @tap="$emit('delete')" class="action-button delete-button"/>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EntryActions'
});
</script>

<style scoped>
.actions-container {
  opacity: 0.8;
}
.action-button {
  font-size: 14;
  min-width: 30;
  height: 30;
  padding: 0;
  margin: 0 2;
  border-radius: 4;
}
.edit-button {
  background-color: #60a5fa;
  color: white;
}
.delete-button {
  background-color: #ef4444;
  color: white;
}
</style>