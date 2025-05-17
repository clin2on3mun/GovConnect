import mongoose, { Schema } from 'mongoose';

export interface IfeedBack extends Document {
  title: string;
  description: string;
  status: string;
  categoryId: mongoose.Types.ObjectId;
  agencyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  response: {
    message: string;
    respondedAt: Date;
    respondedBy: mongoose.Types.ObjectId;
  };
}

const submissionSchema = new Schema<IfeedBack>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agency',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved'],
      default: 'pending',
    },
    response: {
      message: { type: String },
      respondedAt: { type: Date },
      respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  {
    timestamps: true,
  },
);

export const Submission = mongoose.model<IfeedBack>(
  'Submission',
  submissionSchema,
);
