import {
   type NextRequest,
   NextResponse as res,
   NextResponse,
} from 'next/server';
import dbConnect from '../../utils/dbConnect';
import { adminAuth } from '../../auth/auth';
import skillValidation from './skillValidation';
import UserModel from '../../models/UserModel';

export async function GET() {
   await dbConnect();

   const users = await UserModel.find();

   if (!users.at(0)) {
      return NextResponse.json(
         { message: 'هیچ داده ای موجود نیست!' },
         { status: 404 },
      );
   }

   return res.json({ skills: users.at(0)?.skills });
}

export async function POST(req: NextRequest) {
   await dbConnect();

   const data = await adminAuth<typeof skillValidation>(req, skillValidation);

   if (data instanceof res) {
      return data;
   }

   data.users.at(0)?.skills.push({
      name: data.verifiedBody.data.name,
      rate: data.verifiedBody.data.rate,
   });

   try {
      await data.users.at(0)?.save();
      return res.json({ status: 'done' });
   } catch (err: any) {
      return res.json({ message: err.message }, { status: 500 });
   }
}
