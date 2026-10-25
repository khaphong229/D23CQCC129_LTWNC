import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

type IAboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IAboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = getBaseUrl();
  const canonicalPath = getI18nPath('/about', locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: 'Gioi thieu du an - Bai tap tuan 8',
    description: 'Trang gioi thieu cong khai da duoc toi uu SEO voi canonical, opengraph-image va JSON-LD.',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Gioi thieu du an - Bai tap tuan 8',
      description: 'Trang gioi thieu cong khai da duoc toi uu SEO voi canonical, opengraph-image va JSON-LD.',
      url: canonicalUrl,
      siteName: 'Kha Phong Portfolio',
      type: 'website',
    },
  };
}

export default async function AboutPage(props: IAboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}${getI18nPath('/about', locale)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    'name': 'Gioi thieu du an - Bai tap tuan 8',
    'url': pageUrl,
    'description': 'Trang gioi thieu cong khai da duoc toi uu SEO voi canonical, opengraph-image va JSON-LD.',
    'mainEntity': {
      '@type': 'Organization',
      'name': 'D23CQCC129 LTWNC',
    },
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 text-white">
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      <h1 className="mb-4 text-3xl font-bold">Giới thiệu Bài tập tuần 8</h1>
      <p className="mb-4 text-base text-gray-300">
        Đây là trang công khai thứ 2 dùng để kiểm tra SEO: đã cấu hình thẻ Canonical, tạo ảnh OpenGraph tự động bằng ImageResponse và nhúng dữ liệu có cấu trúc JSON-LD.
      </p>
      <ul className="mb-6 list-disc pl-6 text-gray-300">
        <li>Xác thực NextAuth: GitHub OAuth và Đăng nhập Email/Mật khẩu</li>
        <li>Phân quyền 2 vai trò (admin, user) ở Middleware, Page và Server Action</li>
        <li>Kiểu TypeScript đầy đủ cho Session (session.user.role)</li>
        <li>Tối ưu SEO cho 2 trang công khai: Trang chủ (/) và Giới thiệu (/about)</li>
      </ul>
      <div className="flex gap-3">
        <Link href="/" className="rounded bg-blue-600 px-4 py-2 font-bold text-white">
          Về Trang chủ
        </Link>
        <Link href="/sign-in" className="rounded bg-gray-700 px-4 py-2 font-bold text-white">
          Trang Đăng nhập
        </Link>
      </div>
    </main>
  );
}
