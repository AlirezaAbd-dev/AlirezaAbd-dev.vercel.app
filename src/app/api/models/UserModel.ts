import mongoose, { InferSchemaType, Model, ObjectId } from 'mongoose';

const userSchema = new mongoose.Schema({
   username: { type: String, required: true },
   password: { type: String, required: true },
   name: { type: String, required: true },
   yearOfBirth: { type: Number, required: true },
   city: { type: String, required: true },
   email: { type: String, required: true },
   introductions: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         text: { type: String, required: true },
      },
   ],
   skills: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         name: { type: String, required: true },
         rate: { type: Number, require: true },
      },
   ],
   educations: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
         certificate: { type: String, required: true },
         duration: { type: String, required: true },
         major: { type: String, required: true },
         university: { type: String, required: true },
      },
   ],
   projects: [
      {
         _id: {
            type: mongoose.SchemaTypes.ObjectId,
            unique: true,
            auto: true,
         },
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
