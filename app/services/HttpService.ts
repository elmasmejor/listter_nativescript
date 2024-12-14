import { getSettings } from '../utils/storage';

export class HttpService {
  static async post(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<any> {
    try {
      const settings = getSettings();
      const url = `${settings.server}${endpoint}`;
      
      console.log('Request URL:', url);
      console.log('Request Body:', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body)
      });

      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${responseText}`);
      }

      // Solo intentar parsear como JSON si hay contenido
      return responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      console.error('HTTP Error:', error);
      throw error;
    }
  }
}