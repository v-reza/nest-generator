import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterSchema } from './dto/register.dto';
import { TransformPasswordPipe } from './transform-password.pipe';
import { LoginSchema } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Register a new user
   * @param registerDto schema body
   * @returns
   */
  @UsePipes(ValidationPipe, TransformPasswordPipe)
  @HttpCode(201)
  @Post('register')
  async register(@Body() registerDto: RegisterSchema) {
    return this.authService.register(registerDto)
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginSchema) {
    return await this.authService.login(loginDto)
  }
}
