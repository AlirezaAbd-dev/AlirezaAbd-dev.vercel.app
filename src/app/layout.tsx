import '../assets/css/styles.css';

import { ReactNode } from 'react';
import AppContainer from '../containers/AppContainer';
import { Metadata, Viewport } from 'next';

const PORTFOLIO_DOMAIN = 'https://portfolio.alireza-abedi.ir';
const APEX_DOMAIN = 'https://alireza-abedi.ir';

export const metadata: Metadata = {
  title: {
    default: 'Portfolio & Projects — Alireza Abedi',
    template: '%s | Projects — Alireza Abedi',
  },
  description:
    'وب‌سایت رسمی، رزومه و نمونه‌کارهای علیرضا عابدی (Alireza Abedi)، لید تیم فرانت‌اند و مهندس نرم‌افزار فول‌استک با تخصص در Next.js، React، Angular، NestJS، ASP.NET Core، معماری تمیز و طراحی سیستم‌های مقیاس‌پذیر.',
  keywords: [
    'علیرضا عابدی',
    'Alireza Abedi',
    'Alireza Abedi Portfolio',
    'Alireza Abedi Projects',
    'علیرضا عابدی برنامه نویس',
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
    { name: 'علیرضا عابدی - Alireza Abedi', url: APEX_DOMAIN },
  ],
  creator: 'علیرضا عابدی (Alireza Abedi)',
  publisher: 'علیرضا عابدی (Alireza Abedi)',
  metadataBase: new URL(PORTFOLIO_DOMAIN),
  alternates: {
    canonical: PORTFOLIO_DOMAIN,
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: PORTFOLIO_DOMAIN,
    title: 'Portfolio & Projects — Alireza Abedi',
    description:
      'رزومه، بیوگرافی و نمونه‌کارهای رسمی علیرضا عابدی (Alireza Abedi)، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک. متخصص در Next.js, React, NestJS, ASP.NET Core.',
    siteName: 'Alireza Abedi Portfolio - علیرضا عابدی',
    images: [
      {
        url: `${PORTFOLIO_DOMAIN}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Portfolio & Projects — Alireza Abedi Preview Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Projects — Alireza Abedi',
    description:
      'رزومه و نمونه‌کارهای علیرضا عابدی (Alireza Abedi)، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک.',
    images: [`${PORTFOLIO_DOMAIN}/opengraph-image`],
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
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${APEX_DOMAIN}/#person`,
      name: 'علیرضا عابدی',
      alternateName: ['Alireza Abedi', 'علیرضا عابدی - Alireza Abedi', 'Alireza Abedi Portfolio'],
      description:
        'لید تیم فرانت‌اند و توسعه‌دهنده ارشد فول‌استک با بیش از ۳.۵ سال سابقه حرفه‌ای، متخصص در Next.js، React، NestJS، ASP.NET Core و Clean Architecture.',
      url: APEX_DOMAIN,
      image: `${PORTFOLIO_DOMAIN}/avatar.png`,
      jobTitle: 'Frontend Team Lead & Full-Stack Developer',
      email: 'alireza.abedi9310@gmail.com',
      telephone: '+98-990-931-0164',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Rasht',
        addressRegion: 'Guilan',
        addressCountry: 'IR',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Islamic Azad University of Rasht',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Shahid Chamran Technical College of Rasht',
        },
      ],
      worksFor: {
        '@type': 'Organization',
        '@id': `${APEX_DOMAIN}/#organization`,
      },
      sameAs: [
        'https://github.com/AlirezaAbd-dev',
        'https://www.linkedin.com/in/alireza-abedi-714280235',
        'https://t.me/AlirezaAbd_Dev',
        'https://instagram.com/alirezaabd.dev',
        PORTFOLIO_DOMAIN,
        'https://AlirezaAbd-dev.vercel.app',
      ],
      knowsAbout: [
        'Next.js',
        'React',
        'Angular',
        'TypeScript',
        'JavaScript',
        'NestJS',
        'ASP.NET Core',
        'C#',
        'Node.js',
        'MongoDB',
        'PostgreSQL',
        'SQL Server',
        'Prisma ORM',
        'Entity Framework Core',
        'Clean Architecture',
        'Domain-Driven Design (DDD)',
        'Microservices',
        'Tailwind CSS',
        'Docker',
        'WebRTC',
        'Socket.io',
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${APEX_DOMAIN}/#organization`,
      name: 'علیرضا عابدی - خدمات مهندسی نرم‌افزار و وب (Alireza Abedi Software Development)',
      alternateName: 'Alireza Abedi Engineering & Consulting',
      url: APEX_DOMAIN,
      logo: `${PORTFOLIO_DOMAIN}/icon.png`,
      image: `${PORTFOLIO_DOMAIN}/avatar.png`,
      description:
        'خدمات تخصصی طراحی، پیاده‌سازی و مشاوره معماری سیستم‌های سازمانی وب، CRM، فرانت‌اند مدرن با Next.js/React و سرویس‌های مقیاس‌پذیر دات‌نت و نست‌جی‌اس.',
      founder: {
        '@id': `${APEX_DOMAIN}/#person`,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rasht Central Area',
        addressLocality: 'Rasht',
        addressRegion: 'Guilan',
        postalCode: '41000',
        addressCountry: 'IR',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+98-990-931-0164',
          email: 'alireza.abedi9310@gmail.com',
          contactType: 'technical support and hiring inquiries',
          areaServed: ['IR', 'Worldwide'],
          availableLanguage: ['Persian', 'English'],
        },
      ],
      sameAs: [
        'https://github.com/AlirezaAbd-dev',
        'https://www.linkedin.com/in/alireza-abedi-714280235',
        'https://t.me/AlirezaAbd_Dev',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${PORTFOLIO_DOMAIN}/#website`,
      url: PORTFOLIO_DOMAIN,
      name: 'Portfolio & Projects — Alireza Abedi',
      description: 'وب‌سایت و پورتفولیوی رسمی مهندسی علیرضا عابدی، لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک.',
      publisher: {
        '@id': `${APEX_DOMAIN}/#organization`,
      },
      inLanguage: 'fa-IR',
    },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className='bg-zinc-50 dark:bg-[#09090b] text-zinc-800 dark:text-zinc-100 min-h-screen selection:bg-emerald-500 selection:text-white transition-colors duration-300 antialiased'>
        <AppContainer>{children}</AppContainer>
      </body>
    </html>
  );
}
