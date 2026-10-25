export type Environment = {
  NODE_ENV: 'development' | 'production' | 'test';
  API_URL: string;
  API_KEY?: string;
};

export type SiteConfig = {
  title: string;
  description: string;
  baseUrl: string;
  locale: string;
  themeColor: string;
};

export type ApiConfig = {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
};
