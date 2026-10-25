import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

type IHomeLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IHomeLayoutProps): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = getBaseUrl();
  const canonicalPath = getI18nPath('/', locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: 'Trang chu Portfolio Sinh Vien - Bai tap tuan 8',
    description: 'Trang portfolio ca nhan tich hop NextAuth, phan quyen RBAC 3 lop va toi uu SEO.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Trang chu Portfolio Sinh Vien - Bai tap tuan 8',
      description: 'Trang portfolio ca nhan tich hop NextAuth, phan quyen RBAC 3 lop va toi uu SEO.',
      url: canonicalUrl,
      siteName: 'Kha Phong Portfolio',
      type: 'website',
    },
  };
}

export default async function HomeLayout(props: IHomeLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Kha Phong Portfolio',
    'url': `${baseUrl}${getI18nPath('/', locale)}`,
    'description': 'Trang portfolio ca nhan tich hop NextAuth, phan quyen RBAC va SEO.',
    'author': {
      '@type': 'Person',
      'name': 'Kha Phong',
    },
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      {props.children}
    </>
  );
}
