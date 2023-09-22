import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { loginValidation } from './loginValidation';
import UserModel from '../../models/UserModel';

export const POST = async (req: NextRequest) => {
   const data = await req.json();

   const validatedBody = loginValidation.safeParse(data);

   if (!validatedBody.success) {
      return NextResponse.json(
         {
            message: 'نام کاربری و یا رمز عبور اشتباه است!',
         },
         { status: 400 },
      );
   }

   const user = await UserModel.find();

   if (user.length !== 0) {
      if (user[0].username === validatedBody.data.username) {
         const passMatch = await bcrypt.compare(
            validatedBody.data.password,
            user[0].password,
         );

         if (!passMatch) {
            return NextResponse.json(
               {
                  message: 'نام کاربری و یا رمز عبور اشتباه است!',
               },
               { status: 400 },
            );
         }

         const token = jwt.sign(
            { username: validatedBody.data.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' },
         );

         return NextResponse.json(
            { message: 'با موفقیت وارد شدید.' },
            { headers: { token } },
         );
      }
      return NextResponse.json(
         {
            message: 'نام کاربری و یا رمز عبور اشتباه است!',
         },
         { status: 400 },
      );
   }

   // if there is no user in database
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(validatedBody.data.password, salt);

   try {
      const newUser = await UserModel.create({
         username: validatedBody.data.username,
         password: hashedPassword,
         name: 'ناشناخته',
         city: 'ناشناخته',
         email: 'ناشناخته',
         yearOfBirth: 1300,
      });

      const token = jwt.sign(
        { username: newUser.username },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' },
     );
  
     return NextResponse.json(
        { message: 'با موفقیت وارد شدید.' },
        { headers: { token } },
     );
   } catch (err) {
      return NextResponse.json(
         { message: 'خطایی در سرور رخ داد!' },
         {
            status: 500,
         },
      );
   }
};
