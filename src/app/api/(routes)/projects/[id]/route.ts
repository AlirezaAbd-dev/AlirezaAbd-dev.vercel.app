import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { NextRequest, NextResponse as res } from 'next/server';
import projectValidation from '../projectValidation';

export async function PUT(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof projectValidation>(
      req,
      projectValidation,
   );

   if (data instanceof res) {
      return data;
   }

   const projectIndex = data.users[0].projects.findIndex(
      (e) => e._id?.toString() === id,
   );

   if (projectIndex === -1) {
      return res.json(
         { message: 'تحصیلات مورد نظر یافت نشد!' },
         { status: 404 },
      );
   }

   data.users[0].projects[projectIndex] = {
      ...data.users[0].projects[projectIndex],
      ...data.verifiedBody.data,
   };

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}

export async function DELETE(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth(req, null);

   if (data instanceof res) {
      return data;
   }

   data.users[0].projects = data.users[0].projects.filter(
      (e) => e._id?.toString() !== id,
   );

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
