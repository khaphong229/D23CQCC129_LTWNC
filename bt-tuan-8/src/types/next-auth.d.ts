import type { DefaultSession } from 'next-auth';

export type UserRole = 'admin' | 'user';

declare module 'next-auth' {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}
