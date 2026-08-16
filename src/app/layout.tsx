import '../assets/css/styles.css';

import { ReactNode } from 'react';
import AppContainer from '../containers/AppContainer';
import { Metadata, Viewport } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alireza-abedi.ir';

export const metadata: Metadata = {
  title: {
    default: 'علیرضا عابدی | لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک',
    template: '%s | علیرضا عابدی',
  },
  description:
    'رزومه و نمونه‌کارهای علیرضا عابدی، لید تیم فرانت‌اند و مهندس نرم‌افزار فول‌استک با تخصص در Next.js، React، Angular، NestJS، ASP.NET Core، و معماری تمیز.',
  keywords: [
    'علیرضا عابدی',
    'Alireza Abedi',
    'توسعه دهنده فرانت اند',
    'لید تیم فرانت اند',
    'برنامه نویس فول استک',
    'Frontend Team Lead',
    'Full-Stack Developer',
    'Next.js Developer',
    'React Developer',
    'NestJS Developer',
    'ASP.NET Core',
    'Clean Architecture',
    'نمونه کار برنامه نویسی',
    'رزومه علیرضا عابدی',
  ],
  authors: [
    { name: 'علیرضا عابدی - Alireza Abedi', url: 'https://alireza-abedi.ir' },
  ],
  creator: 'علیرضا عابدی',
  publisher: 'علیرضا عابدی',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteUrl,
    title: 'علیرضا عابدی | لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک',
    description:
      'رزومه و نمونه‌کارهای علیرضا عابدی، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک. متخصص در Next.js, React, NestJS, ASP.NET Core.',
    siteName: 'Alireza Abedi Portfolio',
    images: [
      {
        url: '/avatar.png',
        width: 800,
        height: 800,
        alt: 'علیرضا عابدی - Alireza Abedi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'علیرضا عابدی | لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک',
    description:
      'رزومه و نمونه‌کارهای علیرضا عابدی، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک.',
    images: ['/avatar.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'علیرضا عابدی',
  alternateName: 'Alireza Abedi',
  url: siteUrl,
  image: `${siteUrl}/avatar.png`,
  jobTitle: 'Frontend Team Lead & Full-Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Software Development',
  },
  sameAs: [
    'https://github.com/AlirezaAbd-dev',
    'https://www.linkedin.com/in/alireza-abedi-714280235',
    'https://t.me/AlirezaAbd_Dev',
    'https://www.instagram.com/alirezaabd.dev',
  ],
  knowsAbout: [
    'Next.js',
    'React',
    'Angular',
    'TypeScript',
    'NestJS',
    'ASP.NET Core',
    'Node.js',
    'MongoDB',
    'PostgreSQL',
    'Clean Architecture',
    'Domain-Driven Design (DDD)',
    'Tailwind CSS',
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='fa' dir='rtl' suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('portfolio-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className='bg-zinc-50 dark:bg-[#09090b] text-zinc-800 dark:text-zinc-100 min-h-screen selection:bg-emerald-500 selection:text-white transition-colors duration-300 antialiased'>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
