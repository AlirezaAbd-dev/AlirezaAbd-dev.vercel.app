import mongoose, { InferSchemaType, Model } from 'mongoose';

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   yearOfBirth: { type: Number, required: true },
   city: { type: String, required: true },
   email: { type: String, required: true },
   introductions: { type: Array<String> },
   skills: [
      {
         name: { type: String, required: true },
         rate: { type: String, require: true },
         icon: { type: String, required: true },
      },
   ],
   educations: [
      {
         certificate: { type: String, required: true },
         duration: { type: String, required: true },
         major: { type: String, required: true },
         university: { type: String, required: true },
      },
   ],
   projects: [
      {
         name: { type: String, required: true },
         image: { type: String, required: true },
         details: { type: String, required: true },
      },
   ],
});

export type UserSchemaType = InferSchemaType<typeof userSchema>;

const UserModel =
   (mongoose.models.Users as Model<UserSchemaType>) ||
   mongoose.model('Users', userSchema);

export default UserModel;
