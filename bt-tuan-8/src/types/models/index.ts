import type { ID } from '@/types/common';

export * from './post';

// Common model interfaces
export type BaseModel = {
  id: ID;
  createdAt: string;
  updatedAt: string;
};

export type SoftDelete = {
  deletedAt?: string;
};

export type Auditable = {
  createdBy?: string;
  updatedBy?: string;
};
