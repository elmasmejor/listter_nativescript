<template>
  <StackLayout>
    <Label text="Límites" class="text-lg font-bold mt-6 mb-4"/>
    
    <GridLayout rows="auto" columns="*,*" class="form-group">
      <Label text="Fijos y Corridos" class="label" col="0"/>
      <TextField v-model="config.fijosCorridosLimit" 
                keyboardType="number"
                class="input text-right" 
                col="1"/>
    </GridLayout>

    <GridLayout rows="auto" columns="*,*" class="form-group">
      <Label text="Parles" class="label" col="0"/>
      <TextField v-model="config.parlesLimit" 
                keyboardType="number"
                class="input text-right" 
                col="1"/>
    </GridLayout>

    <GridLayout rows="auto" columns="*,*" class="form-group">
      <Label text="Centenas" class="label" col="0"/>
      <TextField v-model="config.centenasLimit" 
                keyboardType="number"
                class="input text-right" 
                col="1"/>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'vue';
import { LimitsConfig } from '../../types/settings';

export default Vue.extend({
  props: {
    config: {
      type: Object as () => LimitsConfig,
      required: true
    }
  }
});
</script>