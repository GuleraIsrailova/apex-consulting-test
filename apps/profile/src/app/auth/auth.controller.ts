import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

export class RegisterDto {
  email: string;
  password: string;
}
export class LoginDto {
  email: string;
  password: string;
}

export class Refresh {
  refreshToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register (@Body() dto: RegisterDto) {
  return this.authService.register(dto);
  }

  @Post('login')
  async login (@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }


  @Post('refresh')
  async refresh (@Body() dto: Refresh) {
    return this.authService.refresh(dto);
  }

}
