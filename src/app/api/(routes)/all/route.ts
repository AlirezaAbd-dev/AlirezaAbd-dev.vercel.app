import { NextResponse as res } from 'next/server';
import dbConnect from '../../utils/dbConnect';
import UserModel from '../../models/UserModel';

export async function GET() {
   await dbConnect();

   const users = await UserModel.find().select({
      username: false,
      password: false,
      __v: false,
      _id: false,
   });

   if (users.length === 0) {
      return res.json({ message: 'داده ای برای نمایش وجود ندارد!' });
   }

   return res.json(users[0]);
}
