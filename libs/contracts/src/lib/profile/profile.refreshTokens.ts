import { IsString } from 'class-validator';

export namespace ProfileRefreshTokens {
  export const topic = 'profile.refreshTokens.command';

  export class Request {

    @IsString()
    refreshToken: string;

  }

  export class Response {
    email: string;
    accessToken: string;
    refreshToken: string;
  }
}
