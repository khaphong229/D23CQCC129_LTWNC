export * from './request';

// Common API types
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

export type ApiError = {
  code: number;
  message: string;
  details?: Record<string, any>;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
};
