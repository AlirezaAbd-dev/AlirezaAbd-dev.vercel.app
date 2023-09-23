import * as jwt from 'jsonwebtoken';

export default function verifyToken(token: string | null) {
   if (!token) return false;
   let verifyToken;
   try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
   } catch (_) {
      return false;
   }

   if (verifyToken == null) return false;

   return verifyToken;
}
