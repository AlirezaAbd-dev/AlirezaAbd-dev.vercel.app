'use server';

export async function addSkillAction(
   token: string,
   name: string,
   rate: number,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/skills`,
      {
         method: 'POST',
         headers: { token },
         body: JSON.stringify({ name, rate }),
         next: { revalidate: 0 },
      },
   );

   if (!response.ok) {
      const message = await response.json();

      if (response.status === 401) {
         return { status: 401, message };
      }

      return {
         status: response.status,
         message: message as string,
      };
   }

   return { status: 200 };
}
export async function editSkillAction(
   token: string,
   id: string,
   name: string,
   rate: number,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/skills/${id}`,
      {
         method: 'PUT',
         headers: { token },
         body: JSON.stringify({ name, rate }),
         next: { revalidate: 0 },
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message as string,
      };
   }

   return { status: 200 };
}
export async function deleteSkillAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/skills/${id}`,
      {
         method: 'DELETE',
         headers: { token },
         next: { revalidate: 0 },
      },
   );

   if (!response.ok) {
      const message = await response.json();

      if (response.status === 401) {
         return { status: 401, message };
      }

      return {
         status: response.status,
         message: message as string,
      };
   }

   return { status: 200 };
}
