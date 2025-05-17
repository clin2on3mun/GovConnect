import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string | undefined;
  role: 'citizen' | 'admin' | 'agency_admin';
  phone?: string;
  agency?: mongoose.Types.ObjectId;
  correctPassword(
    candidatePassword: string,
    userPassword: string | undefined,
  ): Promise<boolean>;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'agent_admin'],
    default: 'user',
  },
  agency: {
    type: Schema.Types.ObjectId,
    ref: 'Agency',
    required: function (this: IUser) {
      return this.role === 'agency_admin';
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};
export default mongoose.model<IUser>('User', userSchema);
