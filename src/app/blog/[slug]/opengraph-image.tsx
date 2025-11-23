import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/actions';

// Görsel boyutu ayarları (Standart OG boyutu: 1200x630)
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Görsel oluşturma fonksiyonu
export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    // Yazı bulunamazsa varsayılan bir görsel göster
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Blog Yazısı Bulunamadı
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      // Görsel tasarımı (React bileşeni gibi)
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a', // Koyu arka plan
          color: 'white',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Arka plan deseni (isteğe bağlı) */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)',
                zIndex: -1,
            }}
        />

        {/* Site Adı / Logo */}
        <div
            style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20,
                color: '#a1a1aa',
            }}
        >
            DIGITAL GARDEN
        </div>

        {/* Blog Başlığı */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            lineHeight: 1.2,
            marginBottom: 20,
            background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {post.title}
        </div>

        {/* Tarih */}
        <div style={{ fontSize: 20, color: '#a1a1aa' }}>
          {new Date(post.createdAt).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>
    ),
    { ...size }
  );
}