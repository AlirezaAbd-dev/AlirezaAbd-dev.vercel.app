import { NextRequest, NextResponse as res } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import { informationValidator } from './informationValidation';
import { adminAuth } from '../../auth/auth';

export async function GET(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth(req, res, null);

   if (data instanceof res) {
      return data;
   }

   const information = {
      fullname: data.users.at(0)?.name,
      birthYear: data.users.at(0)?.yearOfBirth,
      email: data.users.at(0)?.email,
      city: data.users.at(0)?.city,
   };

   return res.json({ information });
}

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof informationValidator>(
      req,
      res,
      informationValidator,
   );

   if (data instanceof res) {
      return data;
   }

   data.users[0].name = data.verifiedBody.data.fullname;
   data.users[0].email = data.verifiedBody.data.email;
   data.users[0].yearOfBirth = data.verifiedBody.data.birthYear;
   data.users[0].city = data.verifiedBody.data.city;

   try {
      await data.users[0].save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
