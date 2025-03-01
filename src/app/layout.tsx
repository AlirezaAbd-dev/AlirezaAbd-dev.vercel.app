import '../assets/css/styles.css';

import { ReactNode } from 'react';
import AppContainer from '../containers/AppContainer';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'علیرضا عابدی | توسعه دهنده فول استک',
  description:
    'به وبسایت شخصی علیرضا عابدی خوش آمدید. من یک توسعه دهنده فول استک هستم که علاقه ی زیادی به برنامه نویسی دارم و دارم سعی میکنم که روز به روز پیشرفت کنم.',
  authors: [
    { name: 'alireza abedi', url: 'https://github.com/AlirezaAbd-dev' },
  ],
  icons: '/favicon.ico',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    images: '/src/assets/avatar.jpg',
  },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fa'>
      <body dir='rtl'>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
