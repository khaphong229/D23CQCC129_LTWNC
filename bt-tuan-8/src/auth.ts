import type { UserRole } from '@/types/next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';

const studentUsers: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}> = [
  {
    id: '1',
    name: 'Nguyen Van Admin',
    email: 'admin@gmail.com',
    password: '123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Tran Thi User',
    email: 'user@gmail.com',
    password: '123',
    role: 'user',
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET ?? 'sinh_vien_bt_tuan_8_secret_key_123456',
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? 'github_client_id_demo',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? 'github_client_secret_demo',
    }),
    Credentials({
      name: 'Email va Mat khau',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? '');
        const password = String(credentials?.password ?? '');

        const foundUser = studentUsers.find(
          item => item.email === email && item.password === password,
        );

        if (!foundUser) {
          return null;
        }

        return {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? '0';
        token.role = user.role ?? 'user';
      }
      if (!token.role) {
        token.role = 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? '0');
        session.user.role = (token.role as UserRole) ?? 'user';
      }
      return session;
    },
  },
});
