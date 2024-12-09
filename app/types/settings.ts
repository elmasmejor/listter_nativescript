export interface ApiConfig {
  server: string;
  username: string;
  password: string;
}

export interface LimitsConfig {
  fijosCorridosLimit: number;
  parlesLimit: number;
  centenasLimit: number;
}

export interface AppSettings extends ApiConfig, LimitsConfig {
  lastSync?: string;
  isConfigured: boolean;
}