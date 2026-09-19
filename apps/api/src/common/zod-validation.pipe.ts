import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as z from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: z.ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `${issue.path.join('.') || 'body'}: ${issue.message}`)
        .join('; ');

      throw new BadRequestException(details);
    }

    return result.data;
  }
}
