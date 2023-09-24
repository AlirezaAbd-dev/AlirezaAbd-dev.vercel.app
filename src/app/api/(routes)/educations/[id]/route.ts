import { adminAuth } from '@/app/api/auth/auth';
import dbConnect from '@/app/api/utils/dbConnect';
import { NextRequest, NextResponse as res } from 'next/server';
import educationValidation from '../educationValidation';

export async function PUT(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof educationValidation>(
      req,
      educationValidation,
   );

   if (data instanceof res) {
      return data;
   }

   const educationIndex = data.users[0].educations.findIndex(
      (e) => e._id?.toString() === id,
   );

   if (educationIndex === -1) {
      return res.json(
         { message: 'تحصیلات مورد نظر یافت نشد!' },
         { status: 404 },
      );
   }

   data.users[0].educations[educationIndex] = {
      certificate: data.verifiedBody.data.certificate,
      duration: `${data.verifiedBody.data.since} - ${data.verifiedBody.data.until}`,
      major: data.verifiedBody.data.major,
      university: data.verifiedBody.data.university,
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

   data.users[0].educations = data.users[0].educations.filter(
      (e) => e._id?.toString() !== id,
   );

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
