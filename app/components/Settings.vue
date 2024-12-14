<template>
  <Page>
    <ActionBar title="Configuración" class="action-bar">
      <NavigationButton text="Volver" android.systemIcon="ic_menu_back" @tap="$navigateBack()"/>
    </ActionBar>

    <ScrollView>
      <StackLayout class="p-4">
        <ApiConfigSection :config="settings"/>
        <LimitsConfigSection :config="settings"/>

        <Button text="Sincronizar" 
                @tap="syncData" 
                class="btn-sync mt-4"
                :isEnabled="isConfigValid && !isSyncing"
                :text="isSyncing ? 'Sincronizando...' : 'Sincronizar'"/>

        <Label v-if="settings.lastSync" 
               :text="'Última sincronización: ' + formatLastSync(settings.lastSync)"
               class="text-sm text-gray-600 mt-2 text-center"/>

        <Button text="Guardar" 
                @tap="saveSettings" 
                class="btn-primary mt-6"/>
                
        <Button text="Restablecer" 
                @tap="resetSettings" 
                class="btn-secondary mt-4"/>

        <ActivityIndicator :busy="isSyncing" class="mt-4"/>
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
import { AuthService } from '../services/AuthService';
import { SyncService } from '../services/SyncService';

export default Vue.extend({
  components: {
    ApiConfigSection,
    LimitsConfigSection
  },
  data() {
    return {
      settings: getSettings(),
      isSyncing: false
    };
  },
  computed: {
    isConfigValid(): boolean {
      return !!(this.settings.server && 
                this.settings.username && 
                this.settings.password);
    }
  },
  methods: {
    async syncData() {
      if (this.isSyncing) return;
      
      this.isSyncing = true;
      try {
        // Asegurarse de que la configuración esté guardada antes de sincronizar
        await this.saveSettings(false);
        
        const loginSuccess = await AuthService.login();
        if (!loginSuccess) {
          this.showToast('Error de autenticación');
          return;
        }

        const syncSuccess = await SyncService.syncBets();
        if (syncSuccess) {
          this.showToast('Sincronización exitosa');
          this.settings = getSettings(); // Actualizar para mostrar última sincronización
        } else {
          this.showToast('Error al sincronizar las apuestas');
        }
      } catch (error) {
        console.error('Error en sincronización:', error);
        this.showToast('Error al sincronizar. Verifica tu conexión.');
      } finally {
        this.isSyncing = false;
      }
    },
    formatLastSync(dateString: string): string {
      try {
        const date = new Date(dateString);
        return date.toLocaleString();
      } catch {
        return dateString;
      }
    },
    async saveSettings(navigate = true) {
      try {
        saveSettings(this.settings);
        this.showToast('Configuración guardada');
        if (navigate) {
          this.$navigateBack();
        }
      } catch (error) {
        this.showToast('Error al guardar la configuración');
      }
    },
    resetSettings() {
      clearSettings();
      AuthService.clearTokens();
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
.btn-sync {
  background-color: #10b981;
  color: white;
  font-size: 16;
  font-weight: bold;
  padding: 12;
  border-radius: 4;
}
.btn-sync:disabled {
  opacity: 0.5;
}
</style>