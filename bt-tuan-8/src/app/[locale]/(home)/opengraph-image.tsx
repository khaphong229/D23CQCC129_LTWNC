import { ImageResponse } from 'next/og';

export const alt = 'Portfolio Sinh Vien - Trang Chu';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          background: '#111827',
          color: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: 20 }}>
          Kha Phong Portfolio - Next.js 15
        </div>
        <div style={{ fontSize: 32, color: '#9ca3af' }}>
          Bai tap tuan 8: NextAuth, RBAC va SEO
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
