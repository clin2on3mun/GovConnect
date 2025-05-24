import { z } from 'zod';

function ObjectId(message: string) {
  return z.string().regex(/^[0-9a-fA-F]{24}$/, message);
}

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['guest', 'agent_admin', 'superadmin']),
  agency: ObjectId('Invalid Agency'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const agencyValidationSchema = z.object({
  name: z.string().min(1, 'Agency name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  categories: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'))
    .nonempty('At least one category is required'),
  admin: ObjectId('Invalid agent_admin'),
});
export const updateAgencySchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  categories: z
    .array(ObjectId('Invalid category ID'))
    .optional()
    .refine((arr) => !arr || arr.length > 0, {
      message: 'At least one category is required when categories are provided',
    }),
  admin: ObjectId('Invalid agent_admin').optional(),
});

export const responseSchema = z.object({
  message: z.string().min(5, 'Response message must be at least 5 characters'),
});

export const submissionValidationSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  description: z.string().min(10, 'Description is required'),
  agencyId: ObjectId('Invalid agent_admin'),
  userId: ObjectId('Invalid guest'),
  categoryId: ObjectId('Invalid category'),
  status: z.enum(['pending', 'in-progress', 'resolved']).optional(),
  response: responseSchema.optional(),
});

export const submissionUpdateValidationSchema = z.object({
  title: z.string().min(3, 'Title is required').optional(),
  description: z.string().min(10, 'Description is required').optional(),
  agencyId: ObjectId('Invalid agent_admin').optional(),
  userId: ObjectId('Invalid guest').optional(),
  categoryId: ObjectId('Invalid category').optional(),
  status: z.enum(['pending', 'in-progress', 'resolved']).optional(),
  response: responseSchema.optional(),
});
