import { Request } from 'express';
import { SafeParseReturnType, ZodSchema } from 'zod';

export default function handleValidation<T>(
  req: Request,
  schema: ZodSchema<T>,
): SafeParseReturnType<T, T> {
  return schema.safeParse(req.body);
}
