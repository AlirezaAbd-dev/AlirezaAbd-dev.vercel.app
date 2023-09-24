import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import { informationValidator } from './informationValidation';
import { adminAuth } from '../../auth/auth';

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof informationValidator>(
      req,
      NextResponse,
      informationValidator,
   );

   if (data instanceof NextResponse) {
      return data;
   }

   data.users[0].name = data.verifiedBody.data.fullname;
   data.users[0].email = data.verifiedBody.data.email;
   data.users[0].yearOfBirth = data.verifiedBody.data.birthYear;
   data.users[0].city = data.verifiedBody.data.city;

   try {
      await data.users[0].save();
      return NextResponse.json({ status: 'done' });
   } catch (err: any) {
      return NextResponse.json({ message: err.message }, { status: 500 });
   }
}
