import { IsEmail, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export namespace ProfileLogin {
  export const topic = 'profile.login.command';

  export class Request {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
  }

  export class Response {
    @ApiProperty()
    email: string;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
  }

}
