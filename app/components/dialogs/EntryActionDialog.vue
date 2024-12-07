<template>
  <StackLayout class="dialog-container">
    <Label :text="title" class="dialog-title"/>
    <Button text="Editar" @tap="onEdit" class="dialog-button edit-button"/>
    <Button text="Eliminar" @tap="onDelete" class="dialog-button delete-button"/>
    <Button text="Cancelar" @tap="onCancel" class="dialog-button cancel-button"/>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onEdit() {
      this.$modal.close('edit');
    },
    onDelete() {
      this.$modal.close('delete');
    },
    onCancel() {
      this.$modal.close();
    }
  }
});
</script>

<style scoped>
.dialog-container {
  background-color: white;
  border-radius: 8;
  padding: 16;
  margin: 24;
  elevation: 4;
}
.dialog-title {
  font-size: 18;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16;
  color: #374151;
}
.dialog-button {
  margin: 4 0;
  padding: 12;
  border-radius: 4;
  font-size: 16;
}
.edit-button {
  background-color: #60a5fa;
  color: white;
}
.delete-button {
  background-color: #ef4444;
  color: white;
}
.cancel-button {
  background-color: #e5e7eb;
  color: #374151;
}
</style>