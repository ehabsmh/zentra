import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { hashPassword } from './password';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(body: RegisterDto) {
    const { email, password } = body;
    const passwordHash = await hashPassword(password);

    try {
      return await this.prisma.user.create({
        data: { email: email.toLowerCase(), passwordHash },
        select: { id: true, email: true, createdAt: true },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already in use');
      }

      throw error;
    }
  }
}
