<template>
  <StackLayout>
    <Label text="Configuración del Servidor" class="text-lg font-bold mb-4"/>
    <StackLayout class="form-group">
      <Label text="Servidor" class="label"/>
      <TextField v-model="config.server" 
                hint="https://api.example.com" 
                class="input"/>
    </StackLayout>

    <StackLayout class="form-group">
      <Label text="Usuario" class="label"/>
      <TextField v-model="config.username" 
                hint="Usuario" 
                class="input"/>
    </StackLayout>

    <StackLayout class="form-group">
      <Label text="Contraseña" class="label"/>
      <TextField v-model="config.password" 
                secure="true"
                hint="Contraseña" 
                class="input"/>
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import { ApiConfig } from '../../types/settings';

export default Vue.extend({
  props: {
    config: {
      type: Object as () => ApiConfig,
      required: true
    }
  }
});
</script>