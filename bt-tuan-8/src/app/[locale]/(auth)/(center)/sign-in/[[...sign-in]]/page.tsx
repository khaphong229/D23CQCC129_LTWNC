import { AuthError } from 'next-auth';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Dang nhap he thong',
    description: 'Trang dang nhap NextAuth bang Email Mat khau hoac GitHub OAuth',
  };
}

export default async function SignInPage(props: ISignInPageProps) {
  const { locale } = await props.params;
  const search = await props.searchParams;
  setRequestLocale(locale);

  async function handleCredentialsLogin(formData: FormData) {
    'use server';
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');

    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/dashboard',
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect('/sign-in?error=1');
      }
      throw error;
    }
  }

  async function handleGithubLogin() {
    'use server';
    await signIn('github', { redirectTo: '/dashboard' });
  }

  return (
    <div className="w-full max-w-md rounded border border-gray-600 bg-gray-900 p-6 text-white">
      <h1 className="mb-4 text-center text-2xl font-bold">Đăng nhập bài tập tuần 8</h1>

      {search.error && (
        <p className="mb-4 rounded bg-red-800 p-2 text-sm text-white">
          Sai email hoặc mật khẩu, vui lòng thử lại!
        </p>
      )}

      <form action={handleCredentialsLogin} className="flex flex-col gap-3">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue="admin@gmail.com"
            className="w-full rounded border border-gray-500 bg-gray-800 p-2 text-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm">
            Mật khẩu
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            defaultValue="123"
            className="w-full rounded border border-gray-500 bg-gray-800 p-2 text-white"
          />
        </div>

        <button
          type="submit"
          className="mt-2 rounded bg-blue-600 p-2 font-bold text-white hover:bg-blue-700"
        >
          Đăng nhập bằng Email / Mật khẩu
        </button>
      </form>

      <div className="my-4 border-t border-gray-700 pt-4">
        <form action={handleGithubLogin}>
          <button
            type="submit"
            className="w-full rounded bg-gray-700 p-2 font-bold text-white hover:bg-gray-600"
          >
            Đăng nhập bằng GitHub (OAuth)
          </button>
        </form>
      </div>

      <div className="mt-4 rounded bg-gray-800 p-3 text-xs text-gray-300">
        <p className="font-bold">Tài khoản mẫu để test:</p>
        <p>1. Admin: admin@gmail.com / Mật khẩu: 123</p>
        <p>2. User: user@gmail.com / Mật khẩu: 123</p>
      </div>
    </div>
  );
}
