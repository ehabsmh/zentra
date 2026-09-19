import * as z from 'zod';

export const registerSchema = z
  .object({
    email: z
      .email({
        error: (issue) =>
          issue.input === undefined ? 'Email is required' : 'Email must be valid',
      })
      .describe('The email of the user'),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? 'Password is required'
            : 'Password must be a string',
      })
      .min(8, { error: 'Password must be at least 8 characters' })
      .describe('The password of the user'),
  })
  .describe('The data required to register a user');

export type RegisterDto = z.infer<typeof registerSchema>;
