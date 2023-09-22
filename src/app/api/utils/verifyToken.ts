import * as jwt from 'jsonwebtoken';

export default function verifyToken(token: string | undefined) {
   if (!token) return false;

   const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      
   if (!verifyToken) return false;

   return true;
}
