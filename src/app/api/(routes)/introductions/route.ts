import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import introductionValidation from './introductionValidation';
import { adminAuth } from '../../auth/auth';

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof introductionValidation>(
      req,
      NextResponse,
      introductionValidation,
   );

   if (data instanceof NextResponse) {
      return data;
   }

   data.users[0].introductions.push({ text: data.verifiedBody.data.text });

   try {
      await data.users[0].save();
      return NextResponse.json({ status: 'done' });
   } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}
