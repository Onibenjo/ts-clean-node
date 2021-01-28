import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  name: string;
  owner: IUser['_id'];
}

const PostSchema: Schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, required: true },
});

export default mongoose.model<IPost>('Post', PostSchema);
