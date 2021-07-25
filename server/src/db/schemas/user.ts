import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  full_name: string;
  password: string;
}

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  full_name: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = model<User>('user', schema);

export default Users;
