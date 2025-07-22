import mongoose, { Document, Schema } from 'mongoose';

export interface IAgency extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  logo: string;
  categories: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId;
  active: boolean;
}

const agencySchema = new Schema<IAgency>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    description: { type: String, required: false },
    logo: { type: String, required: false },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IAgency>('Agency', agencySchema);
