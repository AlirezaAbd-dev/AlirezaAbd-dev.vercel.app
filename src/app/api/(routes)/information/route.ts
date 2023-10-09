import { type NextRequest, NextResponse as res } from 'next/server';
import { adminAuth } from '../../auth/auth';
import dbConnect from '../../utils/dbConnect';
import { informationValidator } from './informationValidation';

export async function GET(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth(req, null);

   if (data instanceof res) {
      return data;
   }

   const information = {
      fullname: data.users.at(0)?.name,
      birthYear: data.users.at(0)?.yearOfBirth,
      email: data.users.at(0)?.email,
      city: data.users.at(0)?.city,
      phone: data.users.at(0)?.phone,
   };

   return res.json({ information });
}

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof informationValidator>(
      req,
      informationValidator,
   );

   if (data instanceof res) {
      return data;
   }

   if (data.users[0]) {
      data.users[0].name = data.verifiedBody.data.fullname;
      data.users[0].email = data.verifiedBody.data.email;
      data.users[0].yearOfBirth = data.verifiedBody.data.birthYear;
      data.users[0].city = data.verifiedBody.data.city;
      data.users[0].phone = data.verifiedBody.data.phone;
   }

   try {
      if (data.users[0]) {
         await data.users[0].save();
      }
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
