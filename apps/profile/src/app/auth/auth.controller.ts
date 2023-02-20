import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {ProfileLogin, ProfileRefreshTokens, ProfileRegister} from "@apex-consulting-test/contracts";
import {RMQRoute, RMQValidate} from "nestjs-rmq";

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @RMQValidate()
  @RMQRoute(ProfileRegister.topic)
  async register (@Body() dto: ProfileRegister.Request): Promise<ProfileRegister.Response> {
  return this.authService.register(dto);
  }

  @RMQValidate()
  @RMQRoute(ProfileLogin.topic)
  async login (@Body() dto: ProfileLogin.Request): Promise<ProfileRegister.Response> {
    return this.authService.login(dto);
  }

  @RMQValidate()
  @RMQRoute(ProfileRefreshTokens.topic)
  async refresh (@Body() dto: ProfileRefreshTokens.Request): Promise<ProfileRefreshTokens.Response> {
    return this.authService.refresh(dto);
  }

}
