import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Dang ky tai khoan',
    description: 'Trang dang ky tai khoan demo',
  };
}

export default async function SignUpPage(props: ISignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="w-full max-w-md rounded border border-gray-600 bg-gray-900 p-6 text-white">
      <h1 className="mb-3 text-xl font-bold">Đăng ký tài khoản</h1>
      <p className="mb-4 text-sm text-gray-300">
        Bài tập sử dụng tài khoản mẫu cấu hình sẵn trong NextAuth. Vui lòng chuyển sang trang đăng nhập.
      </p>
      <Link
        href="/sign-in"
        className="inline-block rounded bg-blue-600 px-4 py-2 font-bold text-white"
      >
        Đi tới trang Đăng nhập
      </Link>
    </div>
  );
}
