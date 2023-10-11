import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { type NextRequest, NextResponse as res } from 'next/server';
import skillValidation from '../skillValidation';

export async function PUT(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof skillValidation>(req, skillValidation);

   if (data instanceof res) {
      return data;
   }

   const skillIndex = data.users[0].skills.findIndex(
      (s) => s._id?.toString() === id,
   );

   if (skillIndex === -1) {
      return res.json({ message: 'مهارت مورد نظر یافت نشد!' }, { status: 404 });
   }

   data.users[0].skills[skillIndex].name = data.verifiedBody.data.name;
   data.users[0].skills[skillIndex].rate = data.verifiedBody.data.rate;

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

   data.users[0].skills = data.users[0].skills.filter(
      (s) => s._id?.toString() !== id,
   );

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
