import { IsEmail, IsString } from 'class-validator';

export namespace ProfileLogin {
  export const topic = 'profile.login.command';

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
