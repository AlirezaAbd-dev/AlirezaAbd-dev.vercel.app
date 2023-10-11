import '@/env';
import '../../assets/css/styles.css';

import { type ReactNode } from 'react';
import { type Metadata } from 'next';
import { Typography } from '@mui/material';
import dynamic from 'next/dynamic';

import { type AllDataType, StoreContainer } from '@/store/store';

const AppContainer = dynamic(() => import('../../containers/AppContainer'), {
   ssr: false,
});

export const metadata: Metadata = {
   title: 'دکتر علی مژدهی',
   viewport: 'width=device-width, initial-scale=1',
   description:
      'به وبسایت شخصی دکتر علی مژدهی خوش آمدید. من یک توسعه دهنده فول استک هستم که علاقه ی زیادی به برنامه نویسی دارم و دارم سعی میکنم که روز به روز پیشرفت کنم.',
   authors: [
      { name: 'alireza abedi', url: 'https://github.com/AlirezaAbd-dev' },
   ],
   icons: '/favicon.ico',
   openGraph: {
      images: '/src/assets/avatar.png',
   },
};

export const revalidate = false;

const getAllData = async () => {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/all`,
      {
         next: { tags: ['data'], revalidate: 3600 },
      },
   );
   const data = await response.json();
   return data as AllDataType;
};

export default async function RootLayout({
   children,
}: {
   children: ReactNode;
}) {
   const data = await getAllData();

   return (
      <html lang='fa'>
         <body dir='rtl'>
            {data ? (
               <StoreContainer data={data}>
                  <AppContainer>{children}</AppContainer>
               </StoreContainer>
            ) : (
               <Typography
                  variant='h2'
                  alignSelf={'center'}
               >
                  هیچ داده ای برای نمایش وجود ندارد!
               </Typography>
            )}
         </body>
      </html>
   );
}
