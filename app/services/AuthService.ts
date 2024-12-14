import { ApplicationSettings } from '@nativescript/core';
import { getSettings } from '../utils/storage';
import { HttpService } from './HttpService';

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

export class AuthService {
  static async login(): Promise<boolean> {
    try {
      const settings = getSettings();
      
      if (!settings.server || !settings.username || !settings.password) {
        throw new Error('Configuración incompleta');
      }

      console.log('Iniciando login con:', {
        server: settings.server,
        username: settings.username,
        passwordLength: settings.password?.length
      });

      const data = await HttpService.post('/api/auth/login', {
        username: settings.username,
        password: settings.password
      });

      if (!data?.access_token || !data?.refreshToken) {
        console.error('Tokens recibidos:', data);
        throw new Error('Respuesta inválida del servidor');
      }

      // Guardar tokens
      ApplicationSettings.setString(ACCESS_TOKEN_KEY, data.access_token);
      ApplicationSettings.setString(REFRESH_TOKEN_KEY, data.refreshToken);
      
      console.log('Login exitoso, tokens guardados');
      return true;
    } catch (error) {
      console.error('Error detallado en login:', error);
      return false;
    }
  }

  static getAccessToken(): string | null {
    return ApplicationSettings.getString(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return ApplicationSettings.getString(REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    ApplicationSettings.remove(ACCESS_TOKEN_KEY);
    ApplicationSettings.remove(REFRESH_TOKEN_KEY);
  }
}