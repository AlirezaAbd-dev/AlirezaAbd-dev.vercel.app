import mongoose from 'mongoose';

async function dbConnect() {
   if (mongoose.connections[0].readyState === 1) {
      return;
   }

   await mongoose.connect(process.env.MONGODB_URI!);
}

export default dbConnect;
