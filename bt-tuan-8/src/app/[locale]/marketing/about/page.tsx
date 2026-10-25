import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

type IAboutProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IAboutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${getI18nPath('/marketing/about', locale)}`;

  return {
    metadataBase: new URL(baseUrl),
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}${getI18nPath('/marketing/about', locale)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': t('meta_title'),
    'description': t('meta_description'),
    'url': canonicalUrl,
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <p>{t('about_paragraph')}</p>

      <div className="mt-2 text-center text-sm">
        {`${t('translation_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://l.crowdin.com/next-js"
        >
          Crowdin
        </a>
      </div>

      <a href="https://l.crowdin.com/next-js">
        <Image
          className="mx-auto mt-2"
          src="/assets/images/crowdin-dark.png"
          alt="Crowdin Translation Management System"
          width={128}
          height={26}
        />
      </a>
    </>
  );
}
