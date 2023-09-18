import { NextResponse } from 'next/server';
import dbConnect from '../utils/dbConnect';
import UserModel from '../models/UserModel';

export async function POST(req: Request) {
   await dbConnect();

   const users = await UserModel.find();
   console.log(users[0]);

   return NextResponse.json({ status: 'done' });
}
