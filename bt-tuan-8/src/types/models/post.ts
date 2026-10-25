import type { ID, Timestamp } from '../common';

export type Post = {
  id: ID;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: 'draft' | 'published';
} & Timestamp;

export type PostCreate = Omit<Post, 'id' | keyof Timestamp>;
export type PostUpdate = Partial<PostCreate>;
