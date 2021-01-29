import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  name: string;
  username: string;
  role: 'user' | 'admin';
  password: string;
  confirmPassword?: string;
}
interface IUserBaseDocument extends IUser, Document<string> {
  comparePassword(_: string, _i: string): boolean;
}

export interface IUserDocument extends IUserBaseDocument {
  confirmPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please fill your name'],
    },
    username: {
      type: String,
      required: [true, 'Please fill your name'],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please fill your email'],
      unique: true,
      lowercase: true,
      //   validate: [validator.isEmail, ' Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please fill your password'],
      minLength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please fill your password confirm'],
      validate: {
        validator: function (el: string) {
          // "this" works only on create and save
          return el === this.password;
        },
        message: 'Your password and confirmation password are not the same',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

// encrypt the password using 'bcryptjs'
// Mongoose -> Document Middleware
userSchema.pre<IUserDocument>('save', async function (next) {
  // check the password if it is modified
  if (!this.isModified('password')) {
    return next();
  }

  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirmPassword field
  this.confirmPassword = undefined;
  next();
});

// This is Instance Method that is gonna be available on all documents in a certain collection
userSchema.methods.comparePassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

const User = model<IUserDocument>('User', userSchema);

export default User;
