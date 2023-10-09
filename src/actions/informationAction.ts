'use server';

import type { InformationDataType } from '@/components/admin/forms/Informations';

export default async function informationAction(
   info: InformationDataType,
   token: string,
) {
   const response = await fetch('http://localhost:3000/api/information', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
         token,
      },
      next: {
         revalidate: 0,
      },
   });

   if (!response.ok) {
      return {
         status: response.status,
         message: await response.json().then((res) => res.message),
      };
   }

   return { status: response.status };
}
