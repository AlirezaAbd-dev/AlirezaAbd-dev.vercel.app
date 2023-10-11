'use server';

export async function addIntroductionAction(token: string, text: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/introductions`,
      {
         method: 'POST',
         body: JSON.stringify({ text }),
         headers: {
            token,
         },
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

export async function editIntroductionAction(
   token: string,
   id: string,
   text: string,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/introductions/${id}`,
      {
         method: 'PUT',
         headers: { token },
         body: JSON.stringify({ text }),
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

export async function deleteIntroductionAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/introductions/${id}`,
      { method: 'DELETE', headers: { token }, next: { revalidate: 0 } },
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
