import { IsEmail, IsString } from 'class-validator';

export namespace ProfileRegister {
  export const topic = 'profile.register.command';

  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

  }

  export class Response {
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
