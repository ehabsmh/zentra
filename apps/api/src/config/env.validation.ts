import * as z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z
    .url()
    .min(1)
    .describe('The URL of the database to connect to'),
  PORT: z.coerce
    .number()
    .int()
    .positive()
    .default(3001)
    .describe('The port of the server'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development')
    .describe('The environment of the server to run in'),
});

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
      .join('; ');

    throw new Error(`Invalid environment variables: ${details}`);
  }

  return result.data;
}
