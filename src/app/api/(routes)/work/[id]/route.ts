import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { type NextRequest, NextResponse as res } from 'next/server';
import workValidation from '../workValidation';

export async function PUT(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof workValidation>(req, workValidation);

   if (data instanceof res) {
      return data;
   }

   const workIndex = data.users[0].works.findIndex(
      (e) => e._id?.toString() === id,
   );

   if (workIndex === -1) {
      return res.json(
         { message: 'تحصیلات مورد نظر یافت نشد!' },
         { status: 404 },
      );
   }

   data.users[0].works[workIndex] = {
      company: data.verifiedBody.data.company,
      time: data.verifiedBody.data.time,
      post: data.verifiedBody.data.post,
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

   data.users[0].works = data.users[0].works.filter(
      (e) => e._id?.toString() !== id,
   );

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
