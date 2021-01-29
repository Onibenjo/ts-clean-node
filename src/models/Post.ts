import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IPost extends Document {
  title: string;
  body: string;
  slug: string;
  user: IUser['_id'];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: Schema.Types.ObjectId, required: true },
    slug: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', PostSchema);
