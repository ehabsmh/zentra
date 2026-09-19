import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { registerSchema, type RegisterDto } from './dto/register.dto';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 8 },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    example: {
      id: '1',
      email: 'test@example.com',
      createdAt: '2021-01-01T00:00:00.000Z',
    },
  })
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }
}
