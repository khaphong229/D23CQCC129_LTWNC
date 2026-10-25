export * from './api';
export * from './common';
export * from './config';

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type ValueOf<T> = T[keyof T];

export type AsyncReturnType<T extends (...args: any) => Promise<any>>
  = T extends (...args: any) => Promise<infer R> ? R : any;
