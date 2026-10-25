import type { PaginationParams } from '../common';
import type { PostCreate, PostUpdate } from '../models/post';

export type CreatePostRequest = {
  body: PostCreate;
};

export type UpdatePostRequest = {
  params: { id: string };
  body: PostUpdate;
};

export type GetPostsRequest = {
  query: PaginationParams & {
    search?: string;
    status?: string;
  };
};
