'use server';

import { EducationFormType } from '@/components/admin/forms/EducationForm';

export async function addEducationAction(
   token: string,
   education: EducationFormType,
) {
   const response = await fetch('http://localhost:3000/api/educations', {
      method: 'POST',
      headers: {
         token,
      },
      body: JSON.stringify(education),
      next: { revalidate: 0 },
   });

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
export async function editEducationAction(
   token: string,
   id: string,
   education: EducationFormType,
) {
   const response = await fetch(`http://localhost:3000/api/educations/${id}`, {
      method: 'PUT',
      headers: {
         token,
      },
      body: JSON.stringify(education),
      next: { revalidate: 0 },
   });

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message as string,
      };
   }

   return { status: 200 };
}
export async function deleteEducationAction(token: string, id: string) {
   const response = await fetch(`http://localhost:3000/api/educations/${id}`, {
      method: 'DELETE',
      headers: {
         token,
      },
      next: { revalidate: 0 },
   });

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
