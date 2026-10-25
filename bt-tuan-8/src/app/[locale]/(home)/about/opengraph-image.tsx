import { ImageResponse } from 'next/og';

export const alt = 'Gioi Thieu - Bai Tap Tuan 8';
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
          fontSize: 54,
          background: '#1e3a8a',
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
        <div style={{ fontWeight: 'bold', marginBottom: 16 }}>
          Trang Gioi Thieu (About Page)
        </div>
        <div style={{ fontSize: 30, color: '#bfdbfe' }}>
          Chuan SEO: Canonical, OpenGraph Image va JSON-LD
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
