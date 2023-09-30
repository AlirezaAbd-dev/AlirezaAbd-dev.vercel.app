'use server';

export async function addIntroductionAction(token: string, text: string) {
   const response = await fetch('http://localhost:3000/api/introductions', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
         token,
      },
   });

   if (!response.ok) {
      if (response.status === 401) {
         return { status: 401 };
      }
      return {
         status: response.status,
         message: await response.json().then((res) => res.message as string),
      };
   }

   return { status: 200 };
}
