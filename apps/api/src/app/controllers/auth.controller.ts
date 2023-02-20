import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import {ProfileLogin, ProfileRefreshTokens, ProfileRegister} from "@apex-consulting-test/contracts";
import {RefreshTokensDto} from "../dtos/refresh.dto";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly rmqService: RMQService
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.rmqService.send<ProfileRegister.Request, ProfileRegister.Response>(ProfileRegister.topic, dto, { headers: { requestId: 'adad' } });
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return await this.rmqService.send<ProfileLogin.Request, ProfileLogin.Response>(ProfileLogin.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokensDto) {
    try {
      return await this.rmqService.send<ProfileRefreshTokens.Request, ProfileRefreshTokens.Response>(ProfileRefreshTokens.topic, dto);
    } catch (e) {
      if (e instanceof Error) {
        throw new UnauthorizedException(e.message);
      }
    }
  }
}
