import dbConnect from '@/app/api/utils/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '../../auth/auth';
import { z } from 'zod';

const validation = z.object({
   text: z.string({
      required_error: 'لطفا متن معرفی مورد نظر را وارد نمایید!',
   }),
});

export async function PUT(req: NextRequest) {
   await dbConnect();
   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth<typeof validation>(
      req,
      NextResponse,
      validation,
   );

   if (data instanceof NextResponse) {
      return data;
   }

   const introductionIndex = data.users[0].introductions.findIndex(
      (i) => i._id?.toString() === id,
   );

   if (introductionIndex === -1) {
      return NextResponse.json(
         { message: 'معرفی مورد نظر یافت نشد!' },
         { status: 404 },
      );
   }

   data.users[0].introductions[introductionIndex].text =
      data.verifiedBody.data.text;

   try {
      await data.users[0].save();
      return NextResponse.json({ status: 'done' });
   } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}

export async function DELETE(req: NextRequest) {
   await dbConnect();

   const id = req.nextUrl.pathname.split('/')[3];

   const data = await adminAuth(req, NextResponse, null);

   if (data instanceof NextResponse) {
      return data;
   }

   data.users[0].introductions = data.users[0].introductions.filter(
      (i) => i._id?.toString() !== id,
   );

   try {
      await data.users[0].save();
      return NextResponse.json({ status: 'done' });
   } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}
