import { getTranslations } from 'next-intl/server';
import { auth } from '@/auth';
import { Sponsors } from './Sponsors';

export const Hello = async () => {
  const t = await getTranslations('Dashboard');
  const session = await auth();

  return (
    <>
      <p>
        {`👋 `}
        {t('hello_message', { email: session?.user?.email ?? '' })}
      </p>
      <Sponsors />
    </>
  );
};
