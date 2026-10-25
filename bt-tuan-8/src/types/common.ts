export type ID = string | number;

export type Timestamp = {
  createdAt: string;
  updatedAt: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};
