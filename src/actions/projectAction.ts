'use server';
import type { ProjectType } from '@/components/admin/forms/ProjectForm';

export async function addProjectAction(token: string, project: ProjectType) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/projects`,
      {
         method: 'POST',
         headers: {
            token,
         },
         body: JSON.stringify(project),
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
export async function editProjectAction(
   token: string,
   id: string,
   project: ProjectType,
) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/projects/${id}`,
      {
         method: 'PUT',
         headers: {
            token,
         },
         body: JSON.stringify(project),
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
export async function deleteProjectAction(token: string, id: string) {
   const response = await fetch(
      `http://localhost:${process.env.PORT}/api/projects/${id}`,
      {
         method: 'DELETE',
         headers: {
            token,
         },
      },
   );

   if (!response.ok) {
      const message = await response.json();

      return {
         status: response.status,
         message: message,
      };
   }

   return { status: 200 };
}
