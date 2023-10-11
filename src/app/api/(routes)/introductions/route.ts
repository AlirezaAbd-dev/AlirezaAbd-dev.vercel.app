import { type NextRequest, NextResponse } from 'next/server';

import { adminAuth } from '../../auth/auth';
import dbConnect from '../../utils/dbConnect';
import introductionValidation from './introductionValidation';

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof introductionValidation>(
      req,
      introductionValidation,
   );

   if (data instanceof NextResponse) {
      return data;
   }

   if (data.users[0])
      data.users[0].introductions.push({ text: data.verifiedBody.data.text });

   try {
      if (data.users[0]) await data.users[0].save();
      return NextResponse.json({ status: 'done' });
   } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}
