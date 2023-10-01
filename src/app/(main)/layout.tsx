import '@/env';
import '../../assets/css/styles.css';

import { ReactNode } from 'react';
import { Metadata } from 'next';

import AppContainer from '../../containers/AppContainer';
import { AllDataType, StoreContainer } from '@/store/store';

export const metadata: Metadata = {
   title: 'علیرضا عابدی | توسعه دهنده فول استک',
   viewport: 'width=device-width, initial-scale=1',
   description:
      'به وبسایت شخصی علیرضا عابدی خوش آمدید. من یک توسعه دهنده فول استک هستم که علاقه ی زیادی به برنامه نویسی دارم و دارم سعی میکنم که روز به روز پیشرفت کنم.',
   authors: [
      { name: 'alireza abedi', url: 'https://github.com/AlirezaAbd-dev' },
   ],
   icons: '/favicon.ico',
   openGraph: {
      images: '/src/assets/avatar.jpg',
   },
};

export const revalidate = false;
export const runtime = 'edge';

const getAllData = async () => {
   const response = await fetch('http://localhost:3000/api/all', {
      next: { tags: ['data'], revalidate: 3600 },
   });
   const data = await response.json();
   return data as AllDataType;
};

export default async function RootLayout({
   children,
}: {
   children: ReactNode;
}) {
   let data;
   try {
      data = await getAllData();
   } catch (err) {
      console.log(err);
   }

   return (
      <html lang='fa'>
         <body dir='rtl'>
            {data && (
               <StoreContainer data={data}>
                  <AppContainer>{children}</AppContainer>
               </StoreContainer>
            )}
         </body>
      </html>
   );
}
