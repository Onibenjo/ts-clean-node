import mongoose, { Schema, Document } from 'mongoose';
import slugify from 'utils/slugify';
import { IUserDocument } from './User';

export interface IPost extends Document {
  title: string;
  body: string;
  slug: string;
  user: IUserDocument['_id'];
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    slug: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

PostSchema.pre<IPost>('save', function (next) {
  this.slug = slugify(this.title, '-');
  next();
});

export default mongoose.model<IPost>('Post', PostSchema);
