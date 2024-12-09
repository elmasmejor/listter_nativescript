<template>
  <Page>
    <ActionBar title="Configuración" class="action-bar">
      <NavigationButton text="Volver" android.systemIcon="ic_menu_back" @tap="$navigateBack()"/>
    </ActionBar>

    <ScrollView>
      <StackLayout class="p-4">
        <ApiConfigSection :config="settings"/>
        <LimitsConfigSection :config="settings"/>

        <Button text="Guardar" 
                @tap="saveSettings" 
                class="btn-primary mt-6"/>
                
        <Button text="Restablecer" 
                @tap="resetSettings" 
                class="btn-secondary mt-4"/>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue';
import { getSettings, saveSettings, clearSettings } from '../utils/storage';
import { AppSettings } from '../types/settings';
import ApiConfigSection from './settings/ApiConfigSection.vue';
import LimitsConfigSection from './settings/LimitsConfigSection.vue';

export default Vue.extend({
  components: {
    ApiConfigSection,
    LimitsConfigSection
  },
  data() {
    return {
      settings: getSettings()
    };
  },
  methods: {
    async saveSettings() {
      try {
        saveSettings(this.settings);
        this.showToast('Configuración guardada');
        this.$navigateBack();
      } catch (error) {
        this.showToast('Error al guardar la configuración');
      }
    },
    resetSettings() {
      clearSettings();
      this.settings = getSettings();
      this.showToast('Configuración restablecida');
    },
    showToast(message: string) {
      setTimeout(() => {
        const Toast = require('@nativescript/core').Toast;
        Toast.makeText(message).show();
      }, 0);
    }
  }
});
</script>

<style scoped>
.form-group {
  margin-bottom: 16;
}
.label {
  font-size: 14;
  margin-bottom: 4;
  color: #374151;
}
.input {
  border-width: 1;
  border-color: #d1d5db;
  border-radius: 4;
  padding: 8 12;
  height: 40;
  background-color: white;
}
.btn-primary {
  background-color: #65adf1;
  color: white;
  font-size: 16;
  font-weight: bold;
  padding: 12;
  border-radius: 4;
}
.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
  font-size: 16;
  font-weight: bold;
  padding: 12;
  border-radius: 4;
}
</style>