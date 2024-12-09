import { ApplicationSettings } from '@nativescript/core';

const SETTINGS_KEY = 'APP_SETTINGS';

export function saveSettings(settings: Partial<AppSettings>): void {
  const currentSettings = getSettings();
  const updatedSettings = { ...currentSettings, ...settings };
  ApplicationSettings.setString(SETTINGS_KEY, JSON.stringify(updatedSettings));
}

export function getSettings(): AppSettings {
  const defaultSettings: AppSettings = {
    server: '',
    username: '',
    password: '',
    fijosCorridosLimit: 100,
    parlesLimit: 100,
    centenasLimit: 100,
    isConfigured: false
  };

  const savedSettings = ApplicationSettings.getString(SETTINGS_KEY);
  if (!savedSettings) {
    return defaultSettings;
  }

  try {
    return { ...defaultSettings, ...JSON.parse(savedSettings) };
  } catch {
    return defaultSettings;
  }
}

export function clearSettings(): void {
  ApplicationSettings.remove(SETTINGS_KEY);
}