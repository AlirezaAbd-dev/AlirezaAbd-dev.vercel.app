import { NextRequest, NextResponse as res } from 'next/server';

import { adminAuth } from '../../auth/auth';
import dbConnect from '../../utils/dbConnect';
import educationValidation from './educationValidation';

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof educationValidation>(
      req,
      educationValidation,
   );

   if (data instanceof res) {
      return data;
   }

   if (data.verifiedBody.data.until <= data.verifiedBody.data.since) {
      return res.json(
         {
            message: 'پایان تحصیل و شروع تحصیل با هم همخوانی ندارند!',
         },
         { status: 400 },
      );
   }

   data.users.at(0)?.educations.push({
      certificate: data.verifiedBody.data.certificate,
      duration: `${data.verifiedBody.data.since} - ${data.verifiedBody.data.until}`,
      major: data.verifiedBody.data.major,
      university: data.verifiedBody.data.university,
   });

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
