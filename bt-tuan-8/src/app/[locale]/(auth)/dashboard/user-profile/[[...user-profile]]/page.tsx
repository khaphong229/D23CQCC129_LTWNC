import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

type IUserProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Ho so nguoi dung',
  };
}

export default async function UserProfilePage(props: IUserProfilePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const session = await auth();
  if (!session || !session.user) {
    redirect('/sign-in');
  }

  return (
    <div className="my-6 rounded border border-gray-300 p-4">
      <h1 className="mb-3 text-xl font-bold">Hồ sơ cá nhân</h1>
      <p>
        Tên:
        {' '}
        {session.user.name}
      </p>
      <p>
        Email:
        {' '}
        {session.user.email}
      </p>
      <p>
        Vai trò:
        {' '}
        {session.user.role}
      </p>
    </div>
  );
}
