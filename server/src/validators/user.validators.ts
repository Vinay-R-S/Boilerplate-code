import { z } from 'zod';

export const updateUserSchema = {
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, 'User ID must be a positive integer')
      .refine((val) => parseInt(val, 10) >= 1, 'User ID must be a positive integer'),
  }),

  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be between 2 and 100 characters')
      .max(100, 'Name must be between 2 and 100 characters')
      .optional(),

    email: z
      .string()
      .trim()
      .email('Must be a valid email address')
      .toLowerCase()
      .optional(),
  }),
};

export const userIdSchema = {
  params: z.object({
    id: z
      .string()
      .regex(/^\d+$/, 'User ID must be a positive integer')
      .refine((val) => parseInt(val, 10) >= 1, 'User ID must be a positive integer'),
  }),
};
