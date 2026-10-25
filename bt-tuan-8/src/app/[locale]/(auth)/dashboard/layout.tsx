import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { auth, signOut } from '@/auth';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function DashboardLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'DashboardLayout',
  });
  const session = await auth();

  async function handleSignOut() {
    'use server';
    await signOut({ redirectTo: '/sign-in' });
  }

  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href="/dashboard/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('dashboard_link')}
            </Link>
          </li>
          <li>
            <Link
              href="/admin/"
              className="border-none font-bold text-blue-700 hover:text-blue-900"
            >
              Trang Admin
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user-profile/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              {t('user_profile_link')}
            </Link>
          </li>
        </>
      )}
      rightNav={(
        <>
          <li className="text-sm text-gray-600">
            {session?.user?.email}
            {' '}
            (
            {session?.user?.role}
            )
          </li>
          <li>
            <form action={handleSignOut}>
              <button className="border-none text-red-600 hover:text-red-800" type="submit">
                {t('sign_out')}
              </button>
            </form>
          </li>
          <li>
            <LocaleSwitcher />
          </li>
        </>
      )}
    >
      {props.children}
    </BaseTemplate>
  );
}
